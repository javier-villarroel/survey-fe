'use client';
import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div
            className="surface-ground min-h-screen min-w-screen overflow-hidden"
            style={{
                backgroundImage: "url('/layout/images/luxor.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                minWidth: '100vw'
            }}
        >
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Borde superior degradado */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            borderTopLeftRadius: '56px',
                            borderTopRightRadius: '56px',
                            background: 'linear-gradient(90deg, #000e28, #93d704, #f05707)',
                            zIndex: 2
                        }}
                    />
                    <div
                        className="w-full py-8 px-5 sm:px-8"
                        style={{
                            borderRadius: '53px',
                            position: 'relative',
                            zIndex: 3,
                            background: '#2b2d4d'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '2rem'
                            }}
                        >
                            <img src="/layout/images/logo-white.png" alt="Genios logo" style={{ width: '18rem', height: 'auto' }} />
                        </div>

                        <div className="flex flex-column align-items-center mt-6">
                            <span className="text-blue-500 font-bold text-5xl mb-4">404</span>
                            <h1 className="text-white font-bold text-4xl mb-2">Página no encontrada</h1>
                            <p className="text-gray-400 mb-5 text-center">
                                Lo sentimos, la página que estás buscando no está disponible.
                            </p>
                            <Button
                                label="Volver al inicio"
                                icon="pi pi-home"
                                onClick={() => router.push('/')}
                                style={{
                                    background: 'linear-gradient(90deg, #000e28, #93d704)',
                                    border: 'none',
                                    padding: '1rem 2rem'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 