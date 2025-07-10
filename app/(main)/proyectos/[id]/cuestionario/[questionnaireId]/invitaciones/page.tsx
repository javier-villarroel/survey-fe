'use client';

import { Card } from 'primereact/card';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { DynamicTable } from "@/app/(main)/components/common/components/table/DynamicTable";
import { useState } from 'react';
import { Participant } from './types';
import { columns } from './config/columns';
import { mockParticipants } from './data/mock';
import { createActions } from './config/actions';
import { confirmDialog } from 'primereact/confirmdialog';

const ParticipantsList = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const questionnaireId = params.questionnaireId as string;
    const [loading] = useState(false);
    const [filters, setFilters] = useState({});

    const handleTableChange = () => {
        console.log('Table page changed');
    };

    const handleFilter = (filters: any) => {
        setFilters(filters);
        console.log('Filters changed:', filters);
    };

    const handleCreateParticipant = () => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaireId}/invitaciones/crear`);
    };

    const handleImportCSV = () => {
        // Aquí se implementará la lógica de importación CSV
        console.log('Importar CSV');
    };

    const handleEdit = (participant: Participant) => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaireId}/invitaciones/${participant.id}/editar`);
    };

    const handleDelete = (participantId: string) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este participante?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            accept: () => {
                // Implementar lógica de eliminación
                console.log('Eliminar participante:', participantId);
            }
        });
    };

    const handleResend = (participant: Participant) => {
        confirmDialog({
            message: '¿Está seguro que desea reenviar la invitación a este participante?',
            header: 'Confirmar reenvío',
            icon: 'pi pi-envelope',
            acceptLabel: 'Sí, reenviar',
            rejectLabel: 'No, cancelar',
            accept: () => {
                // Implementar lógica de reenvío
                console.log('Reenviar invitación a:', participant);
            }
        });
    };

    const actions = createActions({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onResend: handleResend
    });

    return (
        <Card>
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="relative w-full mb-4">
                    <h2 className="text-2xl font-bold">Participantes del Cuestionario</h2>
                    <div className="absolute right-0 top-0 -mt-1 flex gap-2">
                        <Button
                            label="Importar CSV"
                            icon="pi pi-upload"
                            onClick={handleImportCSV}
                            className="p-button-secondary"
                        />
                        <Button
                            label="Crear participante"
                            icon="pi pi-plus"
                            onClick={handleCreateParticipant}
                            style={{
                                backgroundColor: '#000e28',
                                borderColor: '#000e28'
                            }}
                        />
                    </div>
                </div>
                
                <div className="mt-4">
                    <DynamicTable<Participant>
                        columns={columns}
                        value={mockParticipants}
                        loading={loading}
                        onPage={handleTableChange}
                        onFilter={handleFilter}
                        totalRecords={mockParticipants.length}
                        globalSearchFields={['firstName', 'lastName', 'email', 'status']}
                        emptyMessage="No se encontraron participantes"
                        rowsPerPageOptions={[10, 25, 50]}
                        actions={actions}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ParticipantsList; 