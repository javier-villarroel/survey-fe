'use client';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputSwitch } from 'primereact/inputswitch';

const ProfileDetail = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [phone, setPhone] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState('');

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const passwordHeader = <h6>Ingrese una contraseña</h6>;
    const passwordFooter = (
        <div className="p-2">
            <h6>La contraseña debe contener:</h6>
            <ul className="pl-4 ml-2 mt-0 text-sm">
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </div>
    );

    return (
        <>
        <h5>Perfil de usuario</h5>
            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="card">
                        <h5>Imagen de perfil</h5>
                        <div className="flex flex-column align-items-center gap-4">
                            <div 
                                onClick={handleImageClick}
                                className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                {previewImage ? (
                                    <div className="relative overflow-hidden" style={{ 
                                        width: '12rem',
                                        height: '12rem',
                                        borderRadius: '50%',
                                    }}>
                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            style={{ 
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                backgroundColor: 'var(--surface-b)',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <i className="pi pi-camera text-white text-2xl"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative hover:shadow-lg transition-shadow">
                                        <i className="pi pi-user mt-3 p-5" style={{ 
                                            fontSize: '5em', 
                                            borderRadius: '50%', 
                                            backgroundColor: 'var(--surface-b)', 
                                            color: 'var(--surface-d)',
                                            width: '12rem',
                                            height: '12rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}></i>
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                            <i className="pi pi-camera text-white text-2xl"></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <small className="text-gray-500"> El tamaño recomendado es de 300x300 y peso de 2MB</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-8">
                    <div className="card">
                        <h5>Informacion personal</h5>
                        <div className="grid formgrid p-fluid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="nombre">Nombre</label>
                                <InputText                                     
                                    placeholder="Ingrese su nombre"
                                    id="nombre" value={username} onChange={(e) => setUsername(e.target.value)} required 
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="apellido">Apellido</label>
                                <InputText                                     
                                    placeholder="Ingrese su apellido"
                                    id="apellido" value={email} onChange={(e) => setEmail(e.target.value)} required 
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="phone">Teléfono</label>
                                <InputText                                     
                                    placeholder="Ingrese su teléfono"
                                    id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} 
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="city">Clave</label>
                                <Password
                                    inputId="password1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese su contraseña"
                                    toggleMask
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    weakLabel="Débil"
                                    mediumLabel="Media"
                                    strongLabel="Fuerte"
                                    promptLabel="Ingrese una contraseña"
                                    className="w-full"
                                    pt={{
                                        root: { 
                                            className: 'w-full relative'
                                        },
                                        input: { 
                                            className: 'w-full pr-8',
                                            style: { paddingRight: '2.5rem' }
                                        },
                                        showIcon: { 
                                            className: 'absolute',
                                            style: { 
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                right: '0.75rem',
                                                zIndex: 1
                                            }
                                        },
                                        hideIcon: { 
                                            className: 'absolute',
                                            style: { 
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                right: '0.75rem',
                                                zIndex: 1
                                            }
                                        },
                                        panel: { className: 'z-50' }
                                    }}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="country">Repetir clave</label>
                               <Password
                                    inputId="password1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese su contraseña"
                                    toggleMask
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    weakLabel="Débil"
                                    mediumLabel="Media"
                                    strongLabel="Fuerte"
                                    promptLabel="Ingrese una contraseña"
                                    className="w-full"
                                    pt={{
                                        root: { 
                                            className: 'w-full relative'
                                        },
                                        input: { 
                                            className: 'w-full pr-8',
                                            style: { paddingRight: '2.5rem' }
                                        },
                                        showIcon: { 
                                            className: 'absolute',
                                            style: { 
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                right: '0.75rem',
                                                zIndex: 1
                                            }
                                        },
                                        hideIcon: { 
                                            className: 'absolute',
                                            style: { 
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                right: '0.75rem',
                                                zIndex: 1
                                            }
                                        },
                                        panel: { className: 'z-50' }
                                    }}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <label htmlFor="country">2FA</label>
                                <InputSwitch
                                    checked={switchValue}
                                    onChange={(e) => setSwitchValue(e.value ?? false)}
                                    className="w-full"
                                    pt={{
                                        root: { className: 'w-full' },
                                        slider: { className: 'w-full' }
                                    }}
                                    style={{ width: '3rem', height: '1.75rem' }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-content-end mt-4">
                            <Button label="Guardar cambios" icon="pi pi-save" className="p-button-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;