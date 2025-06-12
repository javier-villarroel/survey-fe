"use client";

import React from "react";
import { Card } from "primereact/card";
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';

interface Version {
    version: string;
    date: string;
    title: string;
    description: string;
    type: 'feature' | 'fix' | 'improvement';
}

const VersionsPage = () => {
    const versions: Version[] = [
        {
            version: "1.2.0",
            date: "2024-03-15",
            title: "Mejoras en la UI y Nuevas Funcionalidades",
            description: "Rediseño completo del perfil de usuario, mejoras en la responsividad y nuevas opciones de configuración.",
            type: "feature"
        },
        {
            version: "1.1.2",
            date: "2024-03-01",
            title: "Correcciones de Rendimiento",
            description: "Optimización en la carga de imágenes y mejoras en la velocidad de respuesta del sistema.",
            type: "improvement"
        },
        {
            version: "1.1.1",
            date: "2024-02-15",
            title: "Corrección de Errores",
            description: "Solución a problemas de validación en formularios y errores de navegación.",
            type: "fix"
        },
        {
            version: "1.1.0",
            date: "2024-02-01",
            title: "Módulo de Usuarios",
            description: "Implementación del módulo de gestión de usuarios con funcionalidades CRUD.",
            type: "feature"
        },
        {
            version: "1.0.0",
            date: "2024-01-15",
            title: "Lanzamiento Inicial",
            description: "Primera versión estable del sistema con funcionalidades básicas.",
            type: "feature"
        }
    ];

    const getTypeTag = (type: Version['type']) => {
        const typeConfig = {
            feature: { severity: 'success', label: 'Nueva Función' },
            fix: { severity: 'danger', label: 'Corrección' },
            improvement: { severity: 'info', label: 'Mejora' }
        };

        return <Tag severity={typeConfig[type].severity as any} value={typeConfig[type].label} />;
    };
    const customizedContent = (item: Version) => {
        return (
            <Card className="mb-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xl font-bold">v{item.version}</span>
                        {getTypeTag(item.type)}
                        <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold m-0">{item.title}</h3>
                    <p className="text-gray-600 m-0">
                        {item.description}
                    </p>
                </div>
            </Card>
        );
    };

return (
        <div className="p-2 sm:p-4">
            <Card className="shadow-2">
                <div className="max-w-full sm:max-w-4xl mx-auto">
                    <div className="mb-6 px-2 sm:px-0">
                        <h2 className="text-2xl font-bold mb-2">Historial de Versiones</h2>
                        <p className="text-gray-600">Registro de cambios y actualizaciones del sistema</p>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <Timeline
                            value={versions}
                            align="alternate"
                            className="w-full min-w-[320px] hidden sm:block"
                            content={customizedContent}
                        />
                        {/* Responsive para móvil: vertical */}
                        <Timeline
                            value={versions}
                            align="left"
                            className="w-full min-w-[320px] block sm:hidden"
                            content={customizedContent}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VersionsPage;