'use client';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { useOnSubmit } from '../hooks/login/useHandleOnSubmit';
import { useContext, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import ReactCodeInput from 'react-code-input';
import { useHandleOTP } from '../hooks/login/useHandleOTP';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { setCookie } from 'typescript-cookie';
import '@/app/styles/toast.scss';
import '@/app/styles/otp.scss';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const hcaptchaRef = useRef(null);

    // Estados para 2FA
    const [showModal, setShowModal] = useState(false);
    const [twoFacData, setTwoFacData] = useState<any>(null);
    const [code, setCode] = useState('');
    const [hasError, setHasError] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [passToken, setPassToken] = useState('');

    const { signIn, isPending } = useOnSubmit(toast, (data) => {
        if (data?.result?.twoFactorAuth) {
            setTwoFacData(data.result);
            setAccessToken(data?.result?.accessToken);
            setPassToken(data?.result?.passToken);
            setHasError(false);
            setCode('');
            setShowModal(true);
        } else {
            router.push('/');
        }
    });

    const { handleOTPComplete, isVerifying } = useHandleOTP();

    const handleTokenChange = async (value: string) => {
        setCode(value);
        setHasError(false);
        
        if (value.length === 4) {
            try {
                const otpResult = await handleOTPComplete(value, twoFacData.passToken);
                if (otpResult) {
                    setShowModal(false);
                    setCode('');
                    setCookie('accessToken', accessToken);
                    setCookie('refreshToken', passToken); 
                    router.push('/');
                } else {
                    setHasError(true);
                }
            } catch (error) {
                setHasError(true);
            }
        }
    };

    const handleLogin = () => {
        if (!captchaToken) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Por favor, complete la verificación de seguridad' });
            return;
        }
        signIn({ password, email });
    };

    const onCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const containerClassName = classNames('surface-ground min-h-screen min-w-screen overflow-hidden', {
        'p-input-filled': layoutConfig.inputStyle === 'filled'
    });

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
                position="top-right"
            />
            <div className="flex flex-column align-items-center justify-content-center ml-5" style={{ marginLeft: '7vw' }}>
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '600px'
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

                            <label htmlFor="password1" className="block font-medium text-xl mb-2" style={{ color: '#fff' }}>
                                Contraseña
                            </label>
                            <Password
                                inputId="password1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full md:w-30rem"
                                feedback={false}
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
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }
                                    },
                                    showIcon: {
                                        style: {
                                            color: '#fff',
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }
                                    }
                                }}
                            />

                            <div className="flex flex-column align-items-center mb-4" style={{ marginTop: '1rem' }}>
                                <div className="flex justify-content-center w-full">
                                    <HCaptcha
                                        ref={hcaptchaRef}
                                        sitekey="20000000-ffff-ffff-ffff-000000000002"
                                        onVerify={onCaptchaVerify}
                                        theme="dark"
                                    />
                                </div>
                            </div>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <a onClick={() => router.push('/auth/forgot')} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: '#fff' }}>
                                    ¿Olvidaste la clave?
                                </a>
                            </div>
                            <Button 
                                label="Iniciar sesión" 
                                className="w-full p-3 text-xl" 
                                onClick={handleLogin} 
                                disabled={isPending || !captchaToken}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de 2FA */}
            <Dialog
                visible={showModal}
                onHide={() => setShowModal(false)}
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
                        Verificación de doble autenticación
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
                style={{
                    width: '32rem',
                    maxWidth: '98vw',
                    borderRadius: '1.2rem',
                    marginTop: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                }}
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
                    Se ha enviado un código de verificación a tu correo electrónico. Por favor, ingrésalo a continuación para completar el inicio de sesión.
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
                        value={code}
                        onChange={handleTokenChange}
                        inputMode="numeric"
                        disabled={isVerifying}
                        className="otp-input-dark"
                        inputStyle={{
                            width: '3rem',
                            height: '3rem',
                            fontSize: '1.5rem',
                            borderRadius: '0.5rem',
                            border: `2px solid ${hasError ? '#ff4444' : '#93d704'}`,
                            background: '#23244a !important',
                            backgroundColor: '#23244a !important',
                            color: '#ffffff !important',
                            margin: '0 0.3rem',
                            textAlign: 'center',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxShadow: '0 0 0 30px #23244a inset !important',
                            WebkitTextFillColor: '#ffffff !important',
                            WebkitBackgroundClip: 'unset !important'
                        }}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default LoginPage;
