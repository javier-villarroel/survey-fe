import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { Card } from 'primereact/card';
import { Stimulus, StepThreeProps } from '../lib/types';

// Datos mock para estímulos por tipo
const mockStimuli = {
    sonido: [
        { id: 1, name: 'Sonido 1', type: 'sonido', duration: '3s', frequency: '440Hz' },
        { id: 2, name: 'Sonido 2', type: 'sonido', duration: '2s', frequency: '880Hz' },
        { id: 3, name: 'Sonido 3', type: 'sonido', duration: '4s', frequency: '220Hz' },
    ],
    color: [
        { id: 4, name: 'Color 1', type: 'color', hexCode: '#FF0000', description: 'Rojo' },
        { id: 5, name: 'Color 2', type: 'color', hexCode: '#00FF00', description: 'Verde' },
        { id: 6, name: 'Color 3', type: 'color', hexCode: '#0000FF', description: 'Azul' },
    ],
    video: [
        { id: 7, name: 'Video 1', type: 'video', duration: '10s', format: 'MP4' },
        { id: 8, name: 'Video 2', type: 'video', duration: '15s', format: 'MP4' },
        { id: 9, name: 'Video 3', type: 'video', duration: '8s', format: 'MP4' },
    ],
    imagen: [
        { id: 10, name: 'Imagen 1', type: 'imagen', format: 'PNG', resolution: '800x600' },
        { id: 11, name: 'Imagen 2', type: 'imagen', format: 'JPG', resolution: '1024x768' },
        { id: 12, name: 'Imagen 3', type: 'imagen', format: 'PNG', resolution: '640x480' },
    ]
};

type StimulusType = keyof typeof mockStimuli;

export const StepThree = ({ data, onDataChange }: StepThreeProps) => {
    const [selectedStimuli, setSelectedStimuli] = useState<Stimulus[]>(data?.selectedStimuli || []);
    const [isRandomOrder, setIsRandomOrder] = useState(data?.isRandomOrder || false);
    const [selectedTables, setSelectedTables] = useState<StimulusType[]>([]);

    const handleTableSelection = (tableType: StimulusType, isSelected: boolean) => {
        let newSelectedTables = [...selectedTables];
        let newSelectedStimuli = [...selectedStimuli];

        if (isSelected) {
            // Agregar tabla
            newSelectedTables.push(tableType);
            // Agregar todos los estímulos de la tabla
            mockStimuli[tableType].forEach(stimulus => {
                if (!newSelectedStimuli.some(s => s.id === stimulus.id)) {
                    newSelectedStimuli.push(stimulus as Stimulus);
                }
            });
        } else {
            // Remover tabla
            newSelectedTables = newSelectedTables.filter(t => t !== tableType);
            // Remover todos los estímulos de la tabla
            newSelectedStimuli = newSelectedStimuli.filter(stimulus => 
                !mockStimuli[tableType].some(s => s.id === stimulus.id)
            );
        }

        setSelectedTables(newSelectedTables);
        setSelectedStimuli(newSelectedStimuli);
        onDataChange({ selectedStimuli: newSelectedStimuli, isRandomOrder });
    };

    const handleStimulusSelection = (stimulus: Stimulus, isSelected: boolean) => {
        let newSelectedStimuli: Stimulus[];
        if (isSelected) {
            newSelectedStimuli = [...selectedStimuli, stimulus];
        } else {
            newSelectedStimuli = selectedStimuli.filter(s => s.id !== stimulus.id);
        }
        setSelectedStimuli(newSelectedStimuli);
        onDataChange({ selectedStimuli: newSelectedStimuli, isRandomOrder });
    };

    const renderStimulusTable = (type: StimulusType) => {
        const isTableSelected = selectedTables.includes(type);
        const data = mockStimuli[type];

        return (
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                        checked={isTableSelected}
                        onChange={e => handleTableSelection(type, e.checked || false)}
                    />
                    <h3 className="text-lg font-semibold capitalize">{type}</h3>
                </div>
                <DataTable
                    value={[...data]}
                    className="p-datatable-sm"
                    showGridlines
                    stripedRows
                    size="small"
                    style={{ maxWidth: '100%' }}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: '3rem' }}
                        body={(rowData) => (
                            <Checkbox
                                checked={selectedStimuli.some(s => s.id === rowData.id)}
                                onChange={e => handleStimulusSelection(rowData as Stimulus, e.checked || false)}
                            />
                        )}
                    />
                    <Column field="name" header="Nombre" style={{ width: '150px' }} />
                    {type === 'sonido' && (
                        <>
                            <Column field="duration" header="Duración" style={{ width: '100px' }} />
                            <Column field="frequency" header="Frecuencia" style={{ width: '100px' }} />
                        </>
                    )}
                    {type === 'color' && (
                        <>
                            <Column field="hexCode" header="Código" style={{ width: '100px' }} />
                            <Column field="description" header="Descripción" style={{ width: '100px' }} />
                        </>
                    )}
                    {type === 'video' && (
                        <>
                            <Column field="duration" header="Duración" style={{ width: '100px' }} />
                            <Column field="format" header="Formato" style={{ width: '100px' }} />
                        </>
                    )}
                    {type === 'imagen' && (
                        <>
                            <Column field="format" header="Formato" style={{ width: '100px' }} />
                            <Column field="resolution" header="Resolución" style={{ width: '100px' }} />
                        </>
                    )}
                </DataTable>
            </div>
        );
    };

    return (
        <Card className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold">Selección de Estímulos</div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">Orden aleatorio:</span>
                    <InputSwitch
                        checked={isRandomOrder}
                        onChange={(e) => {
                            setIsRandomOrder(e.value || false);
                            onDataChange({ selectedStimuli, isRandomOrder: e.value || false });
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderStimulusTable('sonido')}
                {renderStimulusTable('color')}
                {renderStimulusTable('video')}
                {renderStimulusTable('imagen')}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="font-bold mb-2">Estímulos seleccionados: {selectedStimuli.length}</div>
                <div className="text-sm">
                    {selectedStimuli.map(stim => stim.name).join(', ')}
                </div>
            </div>
        </Card>
    );
}; 