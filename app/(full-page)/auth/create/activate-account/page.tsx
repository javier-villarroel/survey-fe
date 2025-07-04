'use client';

import { LayoutContext } from '../../../../../layout/context/layoutcontext';
import { useContext, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import type { ToastMessage } from 'primereact/toast';
import { noAuthApi } from '@/app/api/axios';

const ActivateAccountContent = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const searchParams = useSearchParams();
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const token = searchParams.get('token');

    const handleSubmit = async () => {
        if (!token) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Token no proporcionado',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Las contraseñas no coinciden',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
            return;
        }

        // Validar requisitos de contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'La contraseña debe cumplir con todos los requisitos',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
            return;
        }

        setLoading(true);
        try {
            const response = await noAuthApi.post('/auth/activate_user', {
                token,
                password
            });

            if (response.data?.result) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Cuenta activada correctamente',
                    life: 3000,
                    style: { background: '#1b4e2f', color: '#ffffff' },
                    contentStyle: { background: '#1b4e2f', color: '#ffffff' }
                });

                setTimeout(() => {
                    router.push('/auth/login');
                }, 3000);
            }
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.info?.message_to_show || 'Error al activar la cuenta',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
        } finally {
            setLoading(false);
        }
    };

    const passwordHeader = <h6 className="text-white">Requisitos de contraseña</h6>;
    const passwordFooter = (
        <div className="p-2 text-white">
            <h6 className="text-white">La contraseña debe contener:</h6>
            <ul className="pl-4 ml-2 mt-0 text-sm">
                <li>Al menos una letra minúscula</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos un carácter especial (!@#$%^&*)</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </div>
    );

    const containerClassName = classNames('surface-ground min-h-screen min-w-screen overflow-hidden', {
        'p-input-filled': layoutConfig.inputStyle === 'filled'
    });

    if (!token) {
        return (
            <div
                className={containerClassName}
                style={{
                    backgroundImage: "url('/layout/images/luxor.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: '100vh',
                    minWidth: '100vw'
                }}
            >
                <div className="flex flex-column align-items-center justify-content-center" style={{ marginLeft: '5vw' }}>
                    <div
                        style={{
                            position: 'relative',
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Borde superior degradado */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '8px',
                                borderTopLeftRadius: '56px',
                                borderTopRightRadius: '56px',
                                background: 'linear-gradient(90deg, #000e28, #93d704, #f05707)',
                                zIndex: 2
                            }}
                        />
                        <div
                            className="w-full py-8 px-5 sm:px-8"
                            style={{
                                borderRadius: '53px',
                                position: 'relative',
                                zIndex: 3,
                                background: '#2b2d4d'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '2rem'
                                }}
                            >
                                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'dark' ? 'light' : 'white'}.png`} alt="Genios logo" style={{ width: '18rem', height: 'auto' }} />
                            </div>
                            <h1
                                style={{
                                    color: '#ffffff',
                                    fontSize: '1.875rem',
                                    fontWeight: '500',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}
                            >
                                Token Inválido
                            </h1>
                            <p
                                style={{
                                    color: '#ffffff',
                                    marginBottom: '1.5rem',
                                    textAlign: 'center',
                                    fontSize: '1rem'
                                }}
                            >
                                El enlace para activar la cuenta es inválido o ha expirado.
                            </p>
                            <Button label="Volver al inicio" className="w-full" onClick={() => router.push('/auth/login')} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={containerClassName}
            style={{
                backgroundImage: "url('/layout/images/luxor.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                minWidth: '100vw'
            }}
        >
            <Toast ref={toast} pt={{
                message: {
                    style: ({ severity }: { severity: ToastMessage['severity'] }) => ({
                        background: severity === 'success' ? '#1b4e2f' : '#8B0000',
                        color: '#ffffff'
                    })
                },
                content: {
                    style: ({ severity }: { severity: ToastMessage['severity'] }) => ({
                        background: severity === 'success' ? '#1b4e2f' : '#8B0000',
                        color: '#ffffff'
                    })
                },
                closeButton: { 
                    style: { 
                        color: '#ffffff' 
                    } 
                }
            }} />
            <div className="flex flex-column align-items-center justify-content-center" style={{ marginLeft: '5vw' }}>
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Borde superior degradado */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            borderTopLeftRadius: '56px',
                            borderTopRightRadius: '56px',
                            background: 'linear-gradient(90deg, #000e28, #93d704, #f05707)',
                            zIndex: 2
                        }}
                    />
                    <div
                        className="w-full py-8 px-5 sm:px-8"
                        style={{
                            borderRadius: '53px',
                            position: 'relative',
                            zIndex: 3,
                            background: '#2b2d4d'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '2rem'
                            }}
                        >
                            <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'dark' ? 'light' : 'white'}.png`} alt="Genios logo" style={{ width: '18rem', height: 'auto' }} />
                        </div>

                        <h1
                            style={{
                                color: '#ffffff',
                                fontSize: '1.875rem',
                                fontWeight: '500',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}
                        >
                            Activar Cuenta
                        </h1>
                        <p
                            style={{
                                color: '#ffffff',
                                marginBottom: '2rem',
                                textAlign: 'center',
                                fontSize: '1rem'
                            }}
                        >
                            Por favor, establezca su contraseña para activar su cuenta
                        </p>

                        <div className="flex flex-column gap-4">
                            <div className="field">
                                <label htmlFor="password" className="block text-white text-lg mb-2">
                                    Contraseña
                                </label>
                                <Password
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    className="w-full"
                                    inputClassName="w-full md:w-30rem"
                                    toggleMask
                                    feedback={true}
                                    inputStyle={{
                                        background: 'transparent',
                                        color: '#fff',
                                        borderColor: '#fff',
                                        padding: '1rem'
                                    }}
                                    pt={{
                                        root: {
                                            style: {
                                                position: 'relative'
                                            }
                                        },
                                        input: {
                                            root: {
                                                style: {
                                                    width: '100%'
                                                }
                                            }
                                        },
                                        panel: {
                                            className: 'bg-gray-900',
                                            style: {
                                                background: '#2b2d4d'
                                            }
                                        },
                                        meter: {
                                            className: 'mb-2'
                                        },
                                        meterLabel: {
                                            className: "pl-2",
                                            style: {
                                                color: '#fff'
                                            }
                                        },
                                        hideIcon: {
                                            style: {
                                                color: '#fff',
                                                position: 'absolute',
                                                right: '0.5rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }
                                        },
                                        showIcon: {
                                            style: {
                                                color: '#fff',
                                                position: 'absolute',
                                                right: '0.5rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }
                                        }
                                    }}
                                    weakLabel="Débil"
                                    mediumLabel="Media"
                                    strongLabel="Fuerte"
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="confirmPassword" className="block text-white text-lg mb-2">
                                    Confirmar Contraseña
                                </label>
                                <Password
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    feedback={false}
                                    toggleMask
                                    className="w-full"
                                    inputClassName="w-full md:w-30rem"
                                    inputStyle={{
                                        background: 'transparent',
                                        color: '#fff',
                                        borderColor: '#fff',
                                        padding: '1rem'
                                    }}
                                    pt={{
                                        root: {
                                            style: {
                                                position: 'relative'
                                            }
                                        },
                                        input: {
                                            root: {
                                                style: {
                                                    width: '100%'
                                                }
                                            }
                                        },
                                        hideIcon: {
                                            style: {
                                                color: '#fff',
                                                position: 'absolute',
                                                right: '0.5rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }
                                        },
                                        showIcon: {
                                            style: {
                                                color: '#fff',
                                                position: 'absolute',
                                                right: '0.5rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <Button
                                label="Activar Cuenta"
                                className="w-full p-3 text-xl mt-4"
                                onClick={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActivateAccountPage = () => {
    return (
        <Suspense fallback={
            <div className="surface-ground min-h-screen min-w-screen overflow-hidden flex align-items-center justify-content-center">
                <div className="animate-pulse bg-gray-200 h-12 w-full max-w-md rounded"></div>
            </div>
        }>
            <ActivateAccountContent />
        </Suspense>
    );
};

export default ActivateAccountPage; 