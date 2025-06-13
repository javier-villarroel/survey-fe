'use client';
import { useOnSubmit } from '../hooks/recover-password/useHandleOnSubmit';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import React, { useContext, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import ReactCodeInput from 'react-code-input';
import { classNames } from 'primereact/utils';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Forgot = () => {
    const { onSubmit, handleOTPComplete, passToken,  userId } = useOnSubmit();
    const [showModal, setShowModal] = React.useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const toast = useRef<Toast>(null);
    const [email, setEmail] = React.useState('');
    const [token, setToken] = React.useState('');
    const router = useRouter();

    const containerClassName = classNames('surface-ground min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleEmailSubmit = async () => {
        if (!email) {
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Por favor, ingrese su correo electrónico', 
                life: 3000 
            });
            return;
        }

        const success = await onSubmit(email);
        if (success) {
            setShowModal(true);
        } else {
            toast.current?.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'No se pudo enviar el correo. Por favor, verifique el correo ingresado.', 
                life: 3000 
            });
        }
    };

    const handleTokenChange = (value: string) => {
        setToken(value);
        if (value.length === 4) {
            handleOTPComplete(value).then(success => {
                if (success) {
                    setShowModal(false);
                    setTimeout(() => {
                        const params = new URLSearchParams({
                            userId: userId?.toString() || '',
                            passToken: passToken || ''
                        });
                        router.push(`/auth/reset-password?${params.toString()}`);
                    }, 1500);
                } else {
                    toast.current?.show({ 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: 'Código de verificación inválido', 
                        life: 3000 
                    });
                }
            });
        }
    };

    const handleNavigateToLogin = () => {
        router.push('/auth/login');
    };

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
            <Toast
                ref={toast}
                pt={{
                    content: { style: { background: '#f44336', color: '#fff' } },
                    closeButton: { style: { color: '#fff' } }
                }}
            />

            <Dialog
                header={
                    <div
                        style={{
                            borderTopLeftRadius: '1.2rem',
                            borderTopRightRadius: '1.2rem',
                            background: '#2b2d4d',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '1.2rem',
                            padding: '1.2rem 2rem 0.5rem 2rem',
                            textAlign: 'center',
                            borderBottom: 'none',
                            position: 'relative'
                        }}
                    >
                        Recuperación de clave
                        <span
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                right: '1.5rem',
                                top: '1.2rem',
                                cursor: 'pointer',
                                color: '#fff',
                                fontSize: 22,
                                zIndex: 10
                            }}
                            aria-label="Cerrar"
                            role="button"
                        >
                            ×
                        </span>
                    </div>
                }
                visible={showModal}
                style={{
                    width: '32rem',
                    maxWidth: '98vw',
                    borderRadius: '1.2rem',
                    marginTop: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                }}
                onHide={() => setShowModal(false)}
                closable={false}
                draggable={false}
                contentStyle={{
                    background: '#2b2d4d',
                    color: '#fff',
                    borderRadius: '0 0 1.2rem 1.2rem',
                    padding: '2.5rem 2rem 2rem 2rem',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }}
                headerStyle={{
                    padding: 0,
                    background: 'transparent',
                    border: 'none'
                }}
            >
                <p
                    style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '1.1rem'
                    }}
                >
                    Si el correo existe, recibirás instrucciones para recuperar tu clave. Por favor, ingresa el código de verificación que se ha enviado a tu correo electrónico.
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1.5rem'
                    }}
                >
                    <ReactCodeInput
                        name="otp"
                        type="text"
                        fields={4}
                        value={token}
                        onChange={handleTokenChange}
                        inputMode="numeric"
                        inputStyle={{
                            width: '3rem',
                            height: '3rem',
                            fontSize: '1.5rem',
                            borderRadius: '0.5rem',
                            border: '2px solid #93d704',
                            background: '#23244a',
                            color: '#fff',
                            margin: '0 0.3rem',
                            textAlign: 'center'
                        }}
                    />
                </div>
            </Dialog>
            <div className="flex flex-column align-items-center justify-content-center" style={{ marginLeft: '2vw' }}>
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
                            background: 'linear-gradient(90deg, #2dabd2, #93d704, #f05707)',
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
                        <div>
                            <label htmlFor="email1" className="block text-xl font-medium mb-2" style={{ color: '#fff' }}>
                                Correo
                            </label>
                            <InputText
                                id="email1"
                                type="text"
                                placeholder="Ingrese su correo electrónico"
                                className="w-full md:w-30rem mb-5"
                                style={{
                                    padding: '1rem',
                                    background: 'transparent',
                                    color: '#fff',
                                    borderColor: '#fff'
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <Button label="Recuperar clave" className="w-full p-3 text-xl mb-2" onClick={handleEmailSubmit}></Button>
                                <Button label="Volver al inicio" className="w-full p-3 text-xl" onClick={handleNavigateToLogin}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
