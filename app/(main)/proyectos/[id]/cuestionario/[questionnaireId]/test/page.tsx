'use client';

import { Card } from 'primereact/card';
import { useParams } from 'next/navigation';
import { ProgressBar } from 'primereact/progressbar';
import { useState, useEffect } from 'react';

interface TestData {
    currentStep: number;
    totalSteps: number;
    progress: number;
}

const TestQuestionnaire = () => {
    const params = useParams();
    const projectId = params.id as string;
    const questionnaireId = params.questionnaireId as string;
    const [testData, setTestData] = useState<TestData>({
        currentStep: 1,
        totalSteps: 6,
        progress: 0
    });

    useEffect(() => {
        // Simular progreso
        const timer = setInterval(() => {
            setTestData(prev => ({
                ...prev,
                progress: prev.progress >= 100 ? 100 : prev.progress + 1
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Card>
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="relative w-full mb-4">
                    <h2 className="text-2xl font-bold mb-4">Test del Cuestionario</h2>
                    <div className="mb-4">
                        <ProgressBar 
                            value={testData.progress} 
                            showValue={true}
                            style={{ height: '20px' }}
                        />
                    </div>
                </div>

                <div className="w-full p-4">
                    <Card>
                        <div className="flex flex-col gap-4">
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
            </div>
        </Card>
    );
};

export default TestQuestionnaire; 