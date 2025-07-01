import { useState } from 'react';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { StepFourProps } from '../lib/types';
import { addLocale } from 'primereact/api';

// Configuración de locale para español
addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

export const StepFour = ({ data, onDataChange, onFinish }: StepFourProps) => {
    const [config, setConfig] = useState({
        estimatedTime: data?.estimatedTime || 30,
        startDate: data?.startDate || null,
        endDate: data?.endDate || null,
        isActive: data?.isActive || false,
        isPaid: data?.isPaid || false
    });

    const handleChange = (field: keyof typeof config, value: any) => {
        const newConfig = { ...config, [field]: value };
        setConfig(newConfig);
        onDataChange(newConfig);
    };

    return (
        <Card className="w-full">
            <div className="text-xl font-bold mb-6">Configuración del Cuestionario</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tiempo estimado */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="estimatedTime" className="font-medium">
                        Tiempo Estimado (minutos)
                    </label>
                    <InputNumber
                        id="estimatedTime"
                        value={config.estimatedTime}
                        onValueChange={(e) => handleChange('estimatedTime', e.value)}
                        min={1}
                        max={480}
                        showButtons
                        className="w-full"
                    />
                </div>

                {/* Fechas */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startDate" className="font-medium">
                            Fecha de Inicio
                        </label>
                        <Calendar
                            id="startDate"
                            value={config.startDate}
                            onChange={(e) => handleChange('startDate', e.value)}
                            showTime
                            hourFormat="24"
                            locale="es"
                            className="w-full"
                            minDate={new Date()}
                            maxDate={config.endDate || undefined}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endDate" className="font-medium">
                            Fecha de Fin
                        </label>
                        <Calendar
                            id="endDate"
                            value={config.endDate}
                            onChange={(e) => handleChange('endDate', e.value)}
                            showTime
                            hourFormat="24"
                            locale="es"
                            className="w-full"
                            minDate={config.startDate || new Date()}
                        />
                    </div>
                </div>

                {/* Switches */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <label htmlFor="isActive" className="font-medium">
                            Activar Cuestionario
                        </label>
                        <InputSwitch
                            id="isActive"
                            checked={config.isActive}
                            onChange={(e) => handleChange('isActive', e.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <label htmlFor="isPaid" className="font-medium">
                            Cuestionario de Pago
                        </label>
                        <InputSwitch
                            id="isPaid"
                            checked={config.isPaid}
                            onChange={(e) => handleChange('isPaid', e.value)}
                        />
                    </div>
                </div>

                {/* Resumen y botón finalizar */}
                <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Resumen de Configuración</h3>
                    <ul className="list-none p-0 m-0">
                        <li>Duración: {config.estimatedTime} minutos</li>
                        <li>Inicio: {config.startDate ? config.startDate.toLocaleString() : 'No definido'}</li>
                        <li>Fin: {config.endDate ? config.endDate.toLocaleString() : 'No definido'}</li>
                        <li>Estado: {config.isActive ? 'Activo' : 'Inactivo'}</li>
                        <li>Tipo: {config.isPaid ? 'De pago' : 'Gratuito'}</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <Button
                    label="Crear Cuestionario"
                    icon="pi pi-check"
                    onClick={onFinish}
                    className="p-button-success"
                />
            </div>
        </Card>
    );
}; 