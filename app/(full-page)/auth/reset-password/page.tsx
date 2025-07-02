'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { useContext, useRef, useState } from 'react';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPasswordService } from '../services/Auth/auth.services';
import type { Password as PasswordType } from 'primereact/password';

// Dynamically import Password component
const Password = dynamic(() => import('primereact/password').then(mod => mod.Password), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-12 w-full rounded"></div>
});

// Separate component that uses useSearchParams
const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const passToken = searchParams.get('passToken');
    const userId = searchParams.get('userId');

    const passwordHeader = <h6 className="text-white">Requisitos de contraseña</h6>;
    const passwordFooter = (
        <div className="p-2 text-white">
            <h6 className="text-white">La contraseña debe contener:</h6>
            <ul className="pl-4 ml-2 mt-0 text-sm">
                <li>Al menos una letra minúscula</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </div>
    );

    const handleSubmit = async () => {
        if (!passToken || !userId) {
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Token o usuario inválido',
                style: { background: '#dc3545', color: '#fff' },
                contentStyle: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Las contraseñas no coinciden',
                style: { background: '#dc3545', color: '#fff' },
                contentStyle: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        // Validar requisitos de contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener mínimo 8 caracteres',
                style: { background: '#dc3545', color: '#fff' },
                contentStyle: { background: '#dc3545', color: '#fff' }
            });
            return;
        }

        setLoading(true);
        try {
            const response = await resetPasswordService({
                userId: parseInt(userId),
                passToken,
                newPassword: password
            });

            if ('error' in response) {
                toast.current?.show({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: response.error,
                    style: { background: '#dc3545', color: '#fff' },
                    contentStyle: { background: '#dc3545', color: '#fff' }
                });
                return;
            }

            toast.current?.show({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: 'Contraseña actualizada correctamente',
                style: { background: '#28a745', color: '#fff' },
                contentStyle: { background: '#28a745', color: '#fff' }
            });
            setTimeout(() => router.push('/auth/login'), 2000);
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Error al cambiar la contraseña',
                style: { background: '#dc3545', color: '#fff' },
                contentStyle: { background: '#dc3545', color: '#fff' }
            });
        } finally {
            setLoading(false);
        }
    };

    if (!passToken || !userId) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                backgroundImage: "url('/layout/images/luxor.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{
                    maxWidth: '450px',
                    width: '90%',
                    background: '#2b2d4d',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                    <h1 style={{
                        color: '#ffffff',
                        fontSize: '1.875rem',
                        fontWeight: '500',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>Token Inválido</h1>
                    <p style={{
                        color: '#ffffff',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontSize: '1rem'
                    }}>El enlace para restablecer la contraseña es inválido o ha expirado.</p>
                    <Button label="Volver al inicio" className="w-full" onClick={() => router.push('/auth/login')} />
                </div>
            </div>
        );
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center" style={{ marginLeft: '5vw' }}>
                <div style={{
                    position: 'relative',
                    borderRadius: '56px',
                    padding: '0.3rem',
                    background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '8px',
                        borderTopLeftRadius: '56px',
                        borderTopRightRadius: '56px',
                        background: 'linear-gradient(90deg, #000e28, #93d704, #f05707)',
                        zIndex: 2
                    }} />
                    <div className="w-full py-8 px-5 sm:px-8" style={{
                        borderRadius: '53px',
                        position: 'relative',
                        zIndex: 3,
                        background: '#2b2d4d'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'dark' ? 'light' : 'white'}.png`} alt="Logo" style={{ width: '18rem', height: 'auto' }} />
                        </div>
                        <div>
                            <h2 className="text-white text-2xl font-bold mb-4 text-center">Cambiar Contraseña</h2>
                            
                            <label htmlFor="password" className="block font-medium text-xl mb-2" style={{ color: '#fff' }}>
                                Nueva Contraseña
                            </label>
                            <div className="field w-full">
                                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-12 w-full rounded"></div>}>
                                    <Password 
                                        inputId="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Ingrese su nueva contraseña" 
                                        toggleMask 
                                        className="w-full mb-5" 
                                        inputClassName="w-full p-3 md:w-30rem"
                                        header={passwordHeader}
                                        footer={passwordFooter}
                                        weakLabel="Débil"
                                        mediumLabel="Media"
                                        strongLabel="Fuerte"
                                        promptLabel="Ingrese una contraseña"
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
                                            color: 'black',
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }
                                    },
                                    showIcon: {
                                        style: {
                                            color: 'black',
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }
                                    }
                                }}
                                    />
                                </Suspense>
                            </div>

                            <label htmlFor="confirmPassword" className="block font-medium text-xl mb-2" style={{ color: '#fff' }}>
                                Confirmar Contraseña
                            </label>
                            <div className="field w-full">
                                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-12 w-full rounded"></div>}>
                                    <Password 
                                        inputId="confirmPassword" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        placeholder="Confirme su nueva contraseña" 
                                        toggleMask 
                                        className="w-full mb-5" 
                                        inputClassName="w-full p-3 md:w-30rem"
                                        feedback={false}
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
                                                    color: 'black',
                                                    position: 'absolute',
                                                    right: '1rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer'
                                                }
                                            },
                                            showIcon: {
                                                style: {
                                                    color: 'black',
                                                    position: 'absolute',
                                                    right: '1rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer'
                                                }
                                            }
                                        }}
                                    />
                                </Suspense>
                            </div>

                            <style jsx global>{`
                                .p-password-panel {
                                    background: #2b2d4d !important;
                                    color: #fff !important;
                                }
                                .p-password i {
                                    color: #fff;
                                }
                                .p-toast .p-toast-message.p-toast-message-error {
                                    background: #dc3545 !important;
                                    border: none !important;
                                }
                                .p-toast .p-toast-message.p-toast-message-error .p-toast-message-content {
                                    color: #fff !important;
                                }
                                .p-toast .p-toast-message.p-toast-message-error .p-toast-icon-close {
                                    color: #fff !important;
                                }
                                .p-password-panel .p-password-meter {
                                    background: rgba(255,255,255,0.2);
                                }
                            `}</style>

                            <Button 
                                label="Cambiar Contraseña" 
                                className="w-full p-3 text-xl" 
                                onClick={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Main component with Suspense boundary
const ResetPasswordPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const containerClassName = classNames('surface-ground min-h-screen min-w-screen overflow-hidden', {
        'p-input-filled': layoutConfig.inputStyle === 'filled'
    });

    return (
        <div className={containerClassName} style={{
            backgroundImage: "url('/layout/images/luxor.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            minWidth: '100vw'
        }}>
            <Suspense fallback={
                <div className="flex justify-center items-center w-full h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                </div>
            }>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage; 