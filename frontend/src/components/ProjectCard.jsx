import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaTrash, FaEdit } from 'react-icons/fa';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Bagian Gambar */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          // --- PERBAIKAN SINTAKSIS DI SINI ---
          src={project.image_url || "https://placehold.co/600x400?text=No+Image"} 
          // ------------------------------------
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Link Demo */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <a href={project.demo_link} target="_blank" rel="noreferrer" className="text-white font-medium flex items-center gap-2 hover:underline">
                <FaExternalLinkAlt /> Lihat Demo
            </a>
        </div>
      </div>
      
      {/* Bagian Konten */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={project.title}>
                {project.title}
            </h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
            {project.description}
        </p>
        
        {/* Tags Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack && project.tech_stack.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Aksi */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <a href={project.repo_link} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1 text-sm">
                <FaGithub /> Repository
            </a>
            <button 
                onClick={() => onDelete(project.id)} 
                className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Hapus Proyek"
            >
                <FaTrash size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;