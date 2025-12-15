const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Ambil token dari header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    
    if (!authHeader ||!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Akses ditolak. Token tidak tersedia." });
    }

    const token = authHeader.split(' ');

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Simpan data user ke objek request agar bisa diakses di controller
        req.user = decoded;
        next(); // Lanjut ke controller berikutnya
    } catch (error) {
        res.status(403).json({ message: "Token tidak valid atau kadaluarsa." });
    }
};

module.exports = authMiddleware;