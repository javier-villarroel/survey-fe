'use client';

import React, { useRef } from 'react';

interface ProjectLogoProps {
    previewImage: string | null;
    onImageChange: (file: File) => void;
}

export const ProjectLogo: React.FC<ProjectLogoProps> = ({ previewImage, onImageChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageChange(file);
        }
    };

    return (
        <div className="card" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
            <h5>Logo del Proyecto</h5>
            <div className="flex flex-column align-items-center justify-content-center gap-4" style={{ flex: 1, paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div 
                    onClick={handleImageClick}
                    className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                    {previewImage ? (
                        <div className="relative overflow-hidden" style={{ 
                            width: '12rem',
                            height: '12rem',
                            borderRadius: '50%',
                        }}>
                            <img
                                src={previewImage}
                                alt="Logo del proyecto"
                                style={{ 
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    backgroundColor: 'var(--surface-b)',
                                    borderRadius: '50%',
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <i className="pi pi-camera text-white text-2xl"></i>
                            </div>
                        </div>
                    ) :
                        <div className="relative hover:shadow-lg transition-shadow">
                            <i className="pi pi-image mt-3 p-5" style={{ 
                                fontSize: '5em', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--surface-b)', 
                                color: 'var(--surface-d)',
                                width: '12rem',
                                height: '12rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}></i>
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                <i className="pi pi-camera text-white text-2xl"></i>
                            </div>
                        </div>
                    }
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                <small className="text-gray-500">El tamaño recomendado es de 300x300 y peso de 2MB</small>
            </div>
        </div>
    );
}; 