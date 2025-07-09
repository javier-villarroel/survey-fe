import React from 'react';
import { Card } from 'primereact/card';

interface PermissionErrorProps {
    message?: string;
}

const PermissionError: React.FC<PermissionErrorProps> = ({ 
    message = "No tienes permisos para acceder a este recurso" 
}) => {
    return (
        <Card className="w-full">
            <div className="flex flex-column align-items-center justify-content-center py-6">
                <i className="pi pi-lock text-6xl text-red-500 mb-4"></i>
                <h2 className="text-900 font-bold text-4xl mb-2">Acceso Denegado</h2>
                <p className="text-600 font-medium text-xl mt-0 mb-6">{message}</p>
            </div>
        </Card>
    );
};

export default PermissionError; 