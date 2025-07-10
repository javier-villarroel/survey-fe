'use client';

import { Card } from 'primereact/card';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { DynamicTable } from "@/app/(main)/components/common/components/table/DynamicTable";
import { useState } from 'react';
import { Questionnaire } from './types';
import { columns } from './config/columns';
import { mockQuestionnaires } from './data/mock';
import { createActions } from './config/actions';
import { confirmDialog } from 'primereact/confirmdialog';

const QuestionnairesList = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const [loading] = useState(false);
    const [filters, setFilters] = useState({});

    const handleTableChange = () => {
        console.log('Table page changed');
    };

    const handleFilter = (filters: any) => {
        setFilters(filters);
        console.log('Filters changed:', filters);
    };

    const handleCreateQuestionnaire = () => {
        router.push(`/proyectos/${projectId}/cuestionario/crear`);
    };

    const handleDetail = (questionnaire: Questionnaire) => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaire.id}`);
    };

    const handleEdit = (questionnaire: Questionnaire) => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaire.id}/editar`);
    };

    const handleDuplicate = (questionnaire: Questionnaire) => {
        // Implementar lógica de duplicación
        console.log('Duplicar cuestionario:', questionnaire);
    };

    const handleDelete = (questionnaireId: string) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este cuestionario?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            accept: () => {
                // Implementar lógica de eliminación
                console.log('Eliminar cuestionario:', questionnaireId);
            }
        });
    };

    const handleShare = (questionnaire: Questionnaire) => {
        // Implementar lógica de compartir link
        console.log('Compartir link del cuestionario:', questionnaire);
    };

    const handleViewInvitations = (questionnaire: Questionnaire) => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaire.id}/invitaciones`);
    };

    const handleTest = (questionnaire: Questionnaire) => {
        router.push(`/proyectos/${projectId}/cuestionario/${questionnaire.id}/test`);
    };

    const actions = createActions({
        onDetail: handleDetail,
        onEdit: handleEdit,
        onDuplicate: handleDuplicate,
        onDelete: handleDelete,
        onShare: handleShare,
        onViewInvitations: handleViewInvitations,
        onTest: handleTest
    });

    return (
        <Card>
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="relative w-full mb-4">
                    <h2 className="text-2xl font-bold">Cuestionarios del Proyecto</h2>
                    <div className="absolute right-0 top-0 -mt-1">
                        <Button
                            label="Crear cuestionario"
                            icon="pi pi-plus"
                            onClick={handleCreateQuestionnaire}
                            style={{
                                backgroundColor: '#000e28',
                                borderColor: '#000e28'
                            }}
                        />
                    </div>
                </div>
                
                <div className="mt-4">
                    <DynamicTable<Questionnaire>
                        columns={columns}
                        value={mockQuestionnaires}
                        loading={loading}
                        onPage={handleTableChange}
                        onFilter={handleFilter}
                        totalRecords={mockQuestionnaires.length}
                        globalSearchFields={['title', 'status']}
                        emptyMessage="No se encontraron cuestionarios"
                        rowsPerPageOptions={[10, 25, 50]}
                        actions={actions}
                    />
                </div>
            </div>
        </Card>
    );
};

export default QuestionnairesList; 