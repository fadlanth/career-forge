const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrasi User Baru
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi dasar
        if (!username ||!email ||!password) {
            return res.status(400).json({ message: "Semua field wajib diisi!" });
        }

        // Cek duplikasi user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email sudah terdaftar" });
        }

        // Enkripsi Password (Hashing)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan ke Database
        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword
        });

        res.status(201).json({ 
            message: "Registrasi berhasil", 
            userId: newUser.id 
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan server internal" });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Verifikasi Password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        // Generate JWT Token
        // Payload berisi ID dan Role untuk keperluan otorisasi di frontend
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token berlaku 24 jam
        );

        res.status(200).json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};