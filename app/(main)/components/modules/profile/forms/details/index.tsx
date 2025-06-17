'use client';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputSwitch } from 'primereact/inputswitch';
import { useProfile } from '../../hooks/useProfile';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProfileDetail = () => {
    const { user, isLoading: isLoadingProfile, error: profileError, refreshProfile } = useProfile();
    const { updateProfile, isLoading: isUpdating } = useUpdateProfile();
    const [username, setUsername] = useState(user?.userName || '');
    const [name, setName] = useState(user?.name || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [switchValue, setSwitchValue] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    React.useEffect(() => {
        if (user) {
            setUsername(user.userName || '');
            setName(user.name || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setSwitchValue(user.twoFactorAuth || false);
        }
    }, [user]);

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

    const handleSubmit = async () => {
        if (password && password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }
        setPasswordError(null);

        const result = await updateProfile({
            userName: username,
            name,
            lastName,
            email,
            phone,
            password: password || undefined
        });

        if (result) {
            setPassword('');
            setConfirmPassword('');
            refreshProfile();
        }
    };

    if (isLoadingProfile) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <ProgressSpinner />
            </div>
        );
    }

    if (profileError) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="text-center">
                    <i className="pi pi-exclamation-circle text-red-500" style={{ fontSize: '2rem' }}></i>
                    <p className="text-red-500 mt-3">{profileError}</p>
                </div>
            </div>
        );
    }

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
                                ) :
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
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <small className="text-gray-500">El tamaño recomendado es de 300x300 y peso de 2MB</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-8">
                    <div className="card">
                        <h5>Información personal</h5>
                        <div className="grid formgrid p-fluid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="username">Usuario</label>
                                <InputText                                     
                                    placeholder="Nombre de usuario"
                                    id="username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="email">Correo electrónico</label>
                                <InputText                                     
                                    placeholder="Correo electrónico"
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="name">Nombre</label>
                                <InputText                                     
                                    placeholder="Ingrese su nombre"
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastName">Apellido</label>
                                <InputText                                     
                                    placeholder="Ingrese su apellido"
                                    id="lastName" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="phone">Teléfono</label>
                                <InputText                                     
                                    placeholder="Ingrese su teléfono"
                                    id="phone" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="twoFactorAuth">Autenticación de doble paso (2FA)</label>
                                <div className="flex align-items-center">
                                    <div className="p-field-checkbox">
                                        <InputSwitch
                                            inputId="twoFactorAuth"
                                            checked={switchValue}
                                            onChange={(e) => setSwitchValue(e.value ?? false)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-500">
                                            {switchValue ? 'Activado' : 'Desactivado'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="password">Nueva contraseña</label>
                                <Password
                                    inputId="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese nueva contraseña"
                                    toggleMask
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    weakLabel="Débil"
                                    mediumLabel="Media"
                                    strongLabel="Fuerte"
                                    promptLabel="Ingrese una contraseña"
                                    className="w-full"
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                <Password
                                    inputId="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirme su contraseña"
                                    toggleMask
                                    feedback={false}
                                    className={`w-full ${passwordError ? 'p-invalid' : ''}`}
                                />
                                {passwordError && (
                                    <small className="p-error block mt-1">{passwordError}</small>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-content-end mt-4">
                            <Button 
                                label="Guardar cambios" 
                                icon="pi pi-save" 
                                className="p-button-primary"
                                onClick={handleSubmit}
                                loading={isUpdating}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
