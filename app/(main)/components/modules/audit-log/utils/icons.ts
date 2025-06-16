export const getActionIcon = (action: string): string => {
    switch (action.toLowerCase()) {
        case 'crear':
            return 'pi pi-plus-circle text-green-500 text-xl';
        case 'modificar':
            return 'pi pi-pencil text-yellow-500 text-xl';
        case 'eliminar':
            return 'pi pi-trash text-red-500 text-xl';
        case 'ver':
            return 'pi pi-eye text-blue-500 text-xl';
        default:
            return 'pi pi-info-circle text-gray-500 text-xl';
    }
};

export const getModuleIcon = (module: string): string => {
    switch (module.toLowerCase()) {
        case 'encuestas':
            return 'pi pi-file-edit text-indigo-500';
        case 'usuarios':
            return 'pi pi-users text-cyan-500';
        case 'preguntas':
            return 'pi pi-question-circle text-purple-500';
        case 'respuestas':
            return 'pi pi-check-square text-teal-500';
        case 'reportes':
            return 'pi pi-chart-bar text-orange-500';
        default:
            return 'pi pi-folder text-gray-500';
    }
}; 