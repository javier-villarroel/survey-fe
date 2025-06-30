'use client';

import { Card } from 'primereact/card';
import { useParams } from 'next/navigation';
import { Steps } from 'primereact/steps';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';

type FormComponent = {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
};
const ProjectQuestionnaire = () => {
    const params = useParams();
    const projectId = params.id as string;
    const [activeIndex, setActiveIndex] = useState<number>(1);
    const [formComponents, setFormComponents] = useState<FormComponent[]>([]);
    const [currentComponent, setCurrentComponent] = useState<FormComponent | null>(null);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    
    const steps = [
        {
            label: 'Componentes',
            icon: 'pi pi-fw pi-list'
        },
        {
            label: 'Preguntas',
            icon: 'pi pi-fw pi-question-circle'
        },
        {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog'
        }
    ];

    const addComponent = (type: string) => {
        const newComponent: FormComponent = {
            id: `component-${Date.now()}`,
            type,
            label: `Nuevo ${type}`,
            placeholder: type === "input" || type === "textarea" ? "Escribe aquí..." : undefined,
            options:
                type === "dropdown" || type === "radio"
                    ? [
                        { value: "opcion1", label: "Opción 1" },
                        { value: "opcion2", label: "Opción 2" },
                        { value: "opcion3", label: "Opción 3" },
                    ]
                    : undefined,
            required: false,
        };
        setFormComponents([...formComponents, newComponent]);
    };

    const removeComponent = (id: string) => {
        setFormComponents(formComponents.filter((comp) => comp.id !== id));
    };

    const updateComponent = (updatedComponent: FormComponent) => {
        setFormComponents(formComponents.map((comp) => (comp.id === updatedComponent.id ? updatedComponent : comp)));
        setCurrentComponent(null);
        setDialogVisible(false);
    };

    const renderComponentSettings = () => {
        if (!currentComponent) return null;

        return (
            <div className="space-y-4 p-4">
                <div className="field">
                    <label htmlFor="label" className="block text-sm font-medium mb-2">Etiqueta</label>
                    <InputText
                        id="label"
                        value={currentComponent.label}
                        onChange={(e) =>
                            setCurrentComponent({
                                ...currentComponent,
                                label: e.target.value,
                            })
                        }
                        className="w-full"
                    />
                </div>

                {(currentComponent.type === "input" || currentComponent.type === "textarea") && (
                    <div className="field">
                        <label htmlFor="placeholder" className="block text-sm font-medium mb-2">Placeholder</label>
                        <InputText
                            id="placeholder"
                            value={currentComponent.placeholder || ""}
                            onChange={(e) =>
                                setCurrentComponent({
                                    ...currentComponent,
                                    placeholder: e.target.value,
                                })
                            }
                            className="w-full"
                        />
                    </div>
                )}

                {(currentComponent.type === "dropdown" || currentComponent.type === "radio") && (
                    <div className="field">
                        <label className="block text-sm font-medium mb-2">Opciones</label>
                        {currentComponent.options?.map((option, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <InputText
                                    value={option.label}
                                    onChange={(e) => {
                                        const newOptions = [...(currentComponent.options || [])];
                                        newOptions[index] = {
                                            ...newOptions[index],
                                            label: e.target.value,
                                            value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                        };
                                        setCurrentComponent({
                                            ...currentComponent,
                                            options: newOptions,
                                        });
                                    }}
                                    className="flex-1"
                                />
                                <Button
                                    icon="pi pi-trash"
                                    severity="danger"
                                    text
                                    onClick={() => {
                                        const newOptions = [...(currentComponent.options || [])];
                                        newOptions.splice(index, 1);
                                        setCurrentComponent({
                                            ...currentComponent,
                                            options: newOptions,
                                        });
                                    }}
                                />
                            </div>
                        ))}
                        <Button
                            icon="pi pi-plus"
                            label="Añadir opción"
                            text
                            onClick={() => {
                                const newOptions = [
                                    ...(currentComponent.options || []),
                                    {
                                        value: `opcion${(currentComponent.options?.length || 0) + 1}`,
                                        label: `Opción ${(currentComponent.options?.length || 0) + 1}`,
                                    },
                                ];
                                setCurrentComponent({
                                    ...currentComponent,
                                    options: newOptions,
                                });
                            }}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="field-checkbox">
                    <Checkbox
                        inputId="required"
                        checked={currentComponent.required === true}
                        onChange={(e) =>
                            setCurrentComponent({
                                ...currentComponent,
                                required: e.checked === true,
                            })
                        }
                    />
                    <label htmlFor="required" className="ml-2">Requerido</label>
                </div>
            </div>
        );
    };

    const renderComponentPreview = (component: FormComponent) => {
        switch (component.type) {
            case "input":
                return (
                    <div className="field">
                        <label htmlFor={component.id} className="block text-sm font-medium mb-2">
                            {component.label}
                            {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <InputText
                            id={component.id}
                            placeholder={component.placeholder}
                            required={component.required}
                            className="w-full"
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div className="field">
                        <label htmlFor={component.id} className="block text-sm font-medium mb-2">
                            {component.label}
                            {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <InputTextarea
                            id={component.id}
                            placeholder={component.placeholder}
                            required={component.required}
                            rows={3}
                            className="w-full"
                        />
                    </div>
                );
            case "dropdown":
                return (
                    <div className="field">
                        <label htmlFor={component.id} className="block text-sm font-medium mb-2">
                            {component.label}
                            {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <Dropdown
                            id={component.id}
                            options={component.options}
                            optionLabel="label"
                            placeholder="Selecciona una opción"
                            className="w-full"
                        />
                    </div>
                );
            case "radio":
                return (
                    <div className="field">
                        <label className="block text-sm font-medium mb-2">
                            {component.label}
                            {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="flex flex-col gap-2">
                            {component.options?.map((option) => (
                                <div key={option.value} className="p-field-radiobutton flex items-center gap-2">
                                    <RadioButton
                                        inputId={`${component.id}-${option.value}`}
                                        name={component.id}
                                        value={option.value}
                                        onChange={(e) => {}}
                                        checked={false}
                                    />
                                    <label htmlFor={`${component.id}-${option.value}`} className="text-sm">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "checkbox":
                return (
                    <div className="field-checkbox">
                        <Checkbox
                            inputId={component.id}
                            checked={false}
                            required={component.required === true}
                        />
                        <label htmlFor={component.id} className="ml-2">
                            {component.label}
                            {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderFormBuilder = () => (
        <div className="flex flex-col gap-4 w-full">
            <Card className="mx-auto">
                <h3 className="text-xl font-semibold mb-4">Componentes Disponibles</h3>
                <div className="gap-3">
                    <div 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addComponent("input")}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <i className="pi pi-pencil text-blue-500"></i>  
                            <span className="font-medium">Input de texto</span>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Vista previa:</div>
                            <input 
                                type="text" 
                                placeholder="Texto corto..." 
                                className="w-full p-2 border rounded text-sm bg-white" 
                                disabled 
                            />
                        </div>
                    </div>

                    <div 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addComponent("textarea")}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <i className="pi pi-align-left text-green-500"></i>
                            <span className="font-medium">Área de texto</span>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Vista previa:</div>
                            <textarea 
                                placeholder="Texto largo..." 
                                className="w-full p-2 border rounded text-sm bg-white resize-none" 
                                rows={2}
                                disabled 
                            />
                        </div>
                    </div>

                    <div 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addComponent("dropdown")}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <i className="pi pi-chevron-down text-purple-500"></i>
                            <span className="font-medium">Lista desplegable</span>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Vista previa:</div>
                            <select className="w-full p-2 border rounded text-sm bg-white" disabled>
                                <option>Seleccionar opción...</option>
                            </select>
                        </div>
                    </div>

                    <div 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addComponent("radio")}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <i className="pi pi-circle text-orange-500"></i>
                            <span className="font-medium">Opción única</span>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Vista previa:</div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <input type="radio" disabled checked />
                                    <span className="text-sm">Opción 1</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" disabled />
                                    <span className="text-sm">Opción 2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addComponent("checkbox")}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <i className="pi pi-check-square text-indigo-500"></i>
                            <span className="font-medium">Casilla de verificación</span>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Vista previa:</div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" disabled />
                                <span className="text-sm">Marcar esta opción</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="min-h-[100%] p-4 w-full">
                <TabView className="w-full">
                    <TabPanel header="Editor" leftIcon="pi pi-cog mr-2">
                        <div className="space-y-4 min-h-[600px] p-4 w-full">
                            {formComponents.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">
                                    <p>Añade componentes desde arriba para comenzar a construir tu formulario.</p>
                                </div>
                            ) : (
                                formComponents.map((component) => (
                                    <div
                                        key={component.id}
                                        className="border rounded-md p-4 relative hover:border-gray-400 transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-medium">{component.label}</h3>
                                            <div className="flex gap-1">
                                                <Button
                                                    icon="pi pi-cog"
                                                    text
                                                    onClick={() => {
                                                        setCurrentComponent(component);
                                                        setDialogVisible(true);
                                                    }}
                                                />
                                                <Button
                                                    icon="pi pi-trash"
                                                    severity="danger"
                                                    text
                                                    onClick={() => removeComponent(component.id)}
                                                />
                                            </div>
                                        </div>
                                        {renderComponentPreview(component)}
                                    </div>
                                ))
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel header="Vista Previa" leftIcon="pi pi-eye mr-2">
                        <div className="space-y-6 min-h-[600px] p-4">
                            {formComponents.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">
                                    <p>Añade componentes para ver la vista previa del formulario.</p>
                                </div>
                            ) : (
                                <>
                                    {formComponents.map((component) => (
                                        <div key={component.id} className="mb-4">
                                            {renderComponentPreview(component)}
                                        </div>
                                    ))}
                                    <Button label="Enviar formulario" className="w-full" />
                                </>
                            )}
                        </div>
                    </TabPanel>
                </TabView>
            </Card>
        </div>
    );

    const renderQuestionConfig = () => {
        console.log('Renderizando QuestionConfig');
        return (
            <div className="w-full bg-white p-4">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex justify-center">
                                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center">
                                    <i className="pi pi-image text-3xl text-gray-400"></i>
                                    <span className="text-lg mt-2">1</span>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center">
                                    <i className="pi pi-image text-3xl text-gray-400"></i>
                                    <span className="text-lg mt-2">2</span>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center">
                                    <i className="pi pi-image text-3xl text-gray-400"></i>
                                    <span className="text-lg mt-2">3</span>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center">
                                    <i className="pi pi-image text-3xl text-gray-400"></i>
                                    <span className="text-lg mt-2">4</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    };

    return (
        <Card>
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="relative w-full mb-4">
                    <h2 className="text-2xl font-bold">Cuestionario del Proyecto</h2>
                </div>
                
                <div className="mb-6">
                    <Steps
                        model={steps}
                        activeIndex={activeIndex}
                        onSelect={(e) => setActiveIndex(e.index)}
                        className="w-full"
                        readOnly={false}
                    />
                </div>

                <div className="mt-4">
                    {activeIndex === 0 && renderFormBuilder()}
                    {activeIndex === 1 && renderQuestionConfig()}
                </div>

                <Dialog
                    header="Configurar componente"
                    visible={dialogVisible}
                    style={{ width: '50vw' }}
                    onHide={() => setDialogVisible(false)}
                    footer={
                        <div>
                            <Button
                                label="Cancelar"
                                icon="pi pi-times"
                                onClick={() => setDialogVisible(false)}
                                className="p-button-text"
                            />
                            <Button
                                label="Guardar"
                                icon="pi pi-check"
                                onClick={() => currentComponent && updateComponent(currentComponent)}
                                autoFocus
                            />
                        </div>
                    }
                >
                    {renderComponentSettings()}
                </Dialog>
            </div>
        </Card>
    );
};

export default ProjectQuestionnaire; 