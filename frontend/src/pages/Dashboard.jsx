import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
// Import komponen ProjectCard dan fungsi handleDelete dari file lain
// import ProjectCard from './ProjectCard'; 

// --- DEKLARASI DATA UNTUK CHART ---
const skillData = {
    labels: ['React', 'Tailwind', 'Node.js', 'Express', 'Sequelize', 'MySQL'], 
    datasets: [
      {
        label: 'Frekuensi Penggunaan',
        data: [10, 8, 5, 5, 4, 4], // Ganti dengan data aktual
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
};
// -----------------------------------

const ProjectDashboard = ({ projects, handleDelete }) => {
    // Definisikan state yang digunakan di JSX
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Anda bisa merender Chart di sini (jika Chart.js sudah diimpor)
    {/* <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Statistik Skill</h2>
        {/* Di sini Anda akan menggunakan komponen Chart (misalnya <Bar data={skillData} />) }
    </div>
    */}
    
    // --- BAGIAN RENDER GRID (Kode yang Diperbaiki) ---
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Kartu "Tambah Proyek" Khusus */}
            <div 
                // Handler onClick menggunakan function yang didefinisikan
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors h-full min-h-[300px]"
            >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <FaPlus size={20} />
                </div>
                <span className="font-semibold text-gray-600">Tambah Proyek Baru</span>
            </div>

            {/* Map data proyek ke komponen kartu */}
            {/* Pastikan `projects` adalah array dan sudah dimuat dari API */}
            {projects && projects.map(project => (
                <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
            ))}
        </div>
    );
}

export default ProjectDashboard;