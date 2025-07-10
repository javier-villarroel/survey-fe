'use client';

import { StepOneData, StepTwoData, StepThreeData, StepFourData } from '../lib/types';
import { StepThree } from '../components/StepThree';
import { StepFour } from '../components/StepFour';
import { StepOne } from '../components/StepOne';
import { StepTwo } from '../components/StepTwo';
import { useParams } from 'next/navigation';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { useState } from 'react';

const ProjectQuestionnaire = () => {
    const params = useParams();
    const projectId = params.id as string;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    // Estados para cada paso
    const [stepOneData, setStepOneData] = useState<StepOneData>({
        formComponents: []
    });

    const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
        totalSample: 0,
        menCount: 0,
        womenCount: 0,
        ageRange: { min: '', max: '' }
    });

    const [stepThreeData, setStepThreeData] = useState<StepThreeData>({
        selectedStimuli: [],
        isRandomOrder: false
    });

    const [stepFourData, setStepFourData] = useState<StepFourData>({
        estimatedTime: 30,
        startDate: null,
        endDate: null,
        isActive: false,
        isPaid: false
    });

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
            label: 'Estímulos',
            icon: 'pi pi-fw pi-images'
        },
        {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog'
        }
    ];

    const handleFinishQuestionnaire = () => {
        console.log('Cuestionario finalizado', {
            stepOneData,
            stepTwoData,
            stepThreeData,
            stepFourData
        });
    };

    return (
        <Card>
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="relative w-full mb-4">
                    <h2 className="text-2xl font-bold">Crear Cuestionario</h2>
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
                    {activeIndex === 0 && (
                        <StepOne
                            data={stepOneData}
                            onDataChange={setStepOneData}
                        />
                    )}
                    {activeIndex === 1 && (
                        <StepTwo
                            data={stepTwoData}
                            onDataChange={setStepTwoData}
                        />
                    )}
                    {activeIndex === 2 && (
                        <StepThree
                            data={stepThreeData}
                            onDataChange={setStepThreeData}
                        />
                    )}
                    {activeIndex === 3 && (
                        <StepFour
                            data={stepFourData}
                            onDataChange={setStepFourData}
                            onFinish={handleFinishQuestionnaire}
                        />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ProjectQuestionnaire; 