const { Project } = require("../models"); // [FIX 1] Import Model Project agar tidak ReferenceError

// DELETE: Hapus proyek
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // [FIX 2] Validasi User Session (Defensive Programming)
    // Mencegah error "Cannot read property 'id' of undefined" jika middleware auth gagal/lewat
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Akses ditolak. User tidak terotentikasi." });
    }

    // Cari proyek dan pastikan pemiliknya adalah user yang request
    const project = await Project.findOne({
      where: {
        id: id,
        user_id: req.user.id,
      },
    });

    // [FIX 3] Handle jika project null (tidak ketemu atau bukan milik user)
    // Mencegah error saat memanggil.destroy() pada object null
    if (!project) {
      return res.status(404).json({ message: "Proyek tidak ditemukan atau Anda tidak memiliki akses." });
    }

    // Hapus dari database
    await project.destroy();

    // (Opsional) Hapus gambar dari Cloudinary bisa ditambahkan di sini

    res.json({ message: "Proyek berhasil dihapus" });
  } catch (error) {
    console.error("Delete Project Error:", error); // Log error untuk developer

    // Jangan kirim raw error ke client di production
    res.status(500).json({
      message: "Terjadi kesalahan server internal.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
