import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { StepTwoProps } from '../lib/types';

export const StepTwo = ({ data, onDataChange }: StepTwoProps) => {
    const handleMenCountChange = (value: number) => {
        if (value >= 0 && value + (data?.womenCount || 0) <= (data?.totalSample || 0)) {
            onDataChange({
                totalSample: data?.totalSample || 0,
                menCount: value,
                womenCount: data?.womenCount || 0,
                ageRange: {
                    min: data?.ageRange?.min || '',
                    max: data?.ageRange?.max || ''
                }
            });
        }
    };

    const handleWomenCountChange = (value: number) => {
        if (value >= 0 && value + (data?.menCount || 0) <= (data?.totalSample || 0)) {
            onDataChange({
                totalSample: data?.totalSample || 0,
                menCount: data?.menCount || 0,
                womenCount: value,
                ageRange: {
                    min: data?.ageRange?.min || '',
                    max: data?.ageRange?.max || ''
                }
            });
        }
    };

    return (
        <div className="w-full p-4">
            <Card>
                <div className="flex flex-col gap-4">
                    {/* Filtros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        {/* Primera fila */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="totalSample" className="font-medium">
                                    Tamaño de muestra total
                                </label>
                                <InputText
                                    id="totalSample"
                                    value={data?.totalSample.toString() || '0'}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 0;
                                        onDataChange({
                                            totalSample: value,
                                            menCount: value < (data?.menCount || 0) ? 0 : data?.menCount || 0,
                                            womenCount: value < (data?.womenCount || 0) ? 0 : data?.womenCount || 0,
                                            ageRange: {
                                                min: data?.ageRange?.min || '',
                                                max: data?.ageRange?.max || ''
                                            }
                                        });
                                    }}
                                    className="w-full"
                                    type="number"
                                    min="0"
                                    placeholder="Ingrese el tamaño total de la muestra"
                                />
                            </div>
                        </div>

                        {/* Segunda fila */}
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Distribución por género</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="menCount" className="text-sm text-gray-600">
                                        Hombres
                                    </label>
                                    <InputText
                                        id="menCount"
                                        value={data?.menCount.toString() || '0'}
                                        onChange={(e) => handleMenCountChange(parseInt(e.target.value) || 0)}
                                        className="w-full"
                                        type="number"
                                        min="0"
                                        max={data?.totalSample ? data.totalSample - (data?.womenCount || 0) : 0}
                                        placeholder="Cantidad"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="womenCount" className="text-sm text-gray-600">
                                        Mujeres
                                    </label>
                                    <InputText
                                        id="womenCount"
                                        value={data?.womenCount.toString() || '0'}
                                        onChange={(e) => handleWomenCountChange(parseInt(e.target.value) || 0)}
                                        className="w-full"
                                        type="number"
                                        min="0"
                                        max={data?.totalSample ? data.totalSample - (data?.menCount || 0) : 0}
                                        placeholder="Cantidad"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tercera fila */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="ageRange" className="font-medium">
                                Rango de edad
                            </label>
                            <div className="flex gap-2 items-center">
                                <InputText
                                    id="ageMin"
                                    value={data?.ageRange?.min || ''}
                                    onChange={(e) =>
                                        onDataChange({
                                            totalSample: data?.totalSample || 0,
                                            menCount: data?.menCount || 0,
                                            womenCount: data?.womenCount || 0,
                                            ageRange: {
                                                min: e.target.value,
                                                max: data?.ageRange?.max || ''
                                            }
                                        })
                                    }
                                    placeholder="Mín"
                                    className="w-full"
                                    type="number"
                                    min="0"
                                />
                                <span>-</span>
                                <InputText
                                    id="ageMax"
                                    value={data?.ageRange?.max || ''}
                                    onChange={(e) =>
                                        onDataChange({
                                            totalSample: data?.totalSample || 0,
                                            menCount: data?.menCount || 0,
                                            womenCount: data?.womenCount || 0,
                                            ageRange: {
                                                min: data?.ageRange?.min || '',
                                                max: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="Máx"
                                    className="w-full"
                                    type="number"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Cuarta fila - Resumen */}
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                            <label className="font-medium">Resumen de distribución</label>
                            <div className="flex gap-4 items-center">
                                <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center gap-2">
                                    <i className="pi pi-user"></i>
                                    Hombres: {data?.menCount || 0} ({data?.totalSample && data.totalSample > 0
                                        ? ((data.menCount / data.totalSample) * 100).toFixed(1)
                                        : 0}
                                    %)
                                </span>
                                <span className="px-3 py-2 bg-pink-100 text-pink-800 rounded-lg flex items-center gap-2">
                                    <i className="pi pi-user"></i>
                                    Mujeres: {data?.womenCount || 0} ({data?.totalSample && data.totalSample > 0
                                        ? ((data.womenCount / data.totalSample) * 100).toFixed(1)
                                        : 0}
                                    %)
                                </span>
                                <span className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2">
                                    <i className="pi pi-users"></i>
                                    Restante: {(data?.totalSample || 0) - ((data?.menCount || 0) + (data?.womenCount || 0))}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cuadrícula de cuadros */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(6, minmax(80px, 100px))',
                                gap: '0.75rem',
                                justifyContent: 'center'
                            }}
                        >
                            {/* Primera fila - 1-6 */}
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={`box-${index + 1}`}
                                    style={{ aspectRatio: '1/1' }}
                                    className="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center bg-white"
                                >
                                    <i className="pi pi-image text-xl text-gray-400"></i>
                                    <span className="text-sm mt-1">{index + 1}</span>
                                </div>
                            ))}

                            {/* Segunda fila - 7-12 */}
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={`box-${index + 7}`}
                                    style={{ aspectRatio: '1/1' }}
                                    className="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center bg-white"
                                >
                                    <i className="pi pi-image text-xl text-gray-400"></i>
                                    <span className="text-sm mt-1">{index + 7}</span>
                                </div>
                            ))}

                            {/* Tercera fila - 13-18 */}
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={`box-${index + 13}`}
                                    style={{ aspectRatio: '1/1' }}
                                    className="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md flex flex-col items-center justify-center bg-white"
                                >
                                    <i className="pi pi-image text-xl text-gray-400"></i>
                                    <span className="text-sm mt-1">{index + 13}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}; 