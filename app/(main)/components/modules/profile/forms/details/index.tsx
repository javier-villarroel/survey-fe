'use client';
import { useHandleOnSubmit } from '../../hooks/update/useHandleOnSubmit';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import { useProfileImage } from '../../hooks/useProfileImage';
import { Skeleton } from 'primereact/skeleton';
import { useProfileInfo } from '../../hooks/useProfileInfo';
import type { ProfileFormData } from '../../lib/schemas';
import { Controller, useForm } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ProfileDetail = () => {
    const form = useForm<ProfileFormData>({});
    const { user, isLoading: isLoadingProfile } = useFetchProfile();
    const { previewImage, fileInputRef, handleImageClick, handleImageChange } = useProfileImage({ 
        setValue: form.setValue,
        user
    });
    const { refreshProfile } = useProfileInfo(form);
    const { isUpdating, onSubmit, toast } = useHandleOnSubmit({ form, refreshProfile });
    const { control, handleSubmit, formState: { errors } } = form;

    const getFormErrorMessage = (name: keyof ProfileFormData) => {
        return errors[name] ? (
            <small className="p-error">{errors[name]?.message}</small>
        ) : null;
    };

    if (isLoadingProfile) {
        return (
            <>
                <h5>Perfil de usuario</h5>
                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <div className="card">
                            <h5>Imagen de perfil</h5>
                            <div className="flex flex-column align-items-center gap-4">
                                <Skeleton shape="circle" size="12rem" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-8">
                        <div className="card">
                            <h5>Información personal</h5>
                            <div className="grid formgrid">
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton height="3rem" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Skeleton height="2rem" className="mb-2" />
                                    <Skeleton width="8rem" height="2rem" />
                                </div>
                                <div className="col-12">
                                    <Skeleton width="10rem" height="3rem" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Toast ref={toast} />
            <h5>Perfil de usuario</h5>
            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="card">
                        <h5>Imagen de perfil</h5>
                        <div className="flex flex-column align-items-center gap-4">
                            <div 
                                onClick={handleImageClick}
                                className="flex flex-column align-items-center cursor-pointer relative"
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
                                                backgroundColor: 'var(--surface-ground)',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center transition-all transition-duration-300 hover:bg-black-alpha-50">
                                            <i className="pi pi-camera text-2xl text-white"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-content-center align-items-center bg-surface-100 relative" style={{ 
                                        width: '12rem',
                                        height: '12rem',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--surface-ground)'
                                    }}>
                                        <i className="pi pi-user text-6xl text-surface-500"></i>
                                        <div className="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center transition-all transition-duration-300 hover:bg-black-alpha-50">
                                            <i className="pi pi-camera text-2xl text-white"></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-8">
                    <div className="card">
                        <h5>Información personal</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid formgrid p-fluid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="name">Nombre</label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="Ingrese su nombre"
                                        />
                                    )}
                                />
                                {getFormErrorMessage('firstName')}
                            </div>
                             <div className="field col-12 md:col-6">
                                <label htmlFor="lastName">Apellido</label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="Ingrese su apellido"
                                        />
                                    )}
                                />
                                {getFormErrorMessage('lastName')}
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="email">Correo electrónico</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="Correo electrónico"
                                        />
                                    )}
                                />
                                {getFormErrorMessage('email')}
                            </div>
                            
                           
                            <div className="field col-12 md:col-6">
                                <label htmlFor="phone">Teléfono</label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="+584143654288"
                                        />
                                    )}
                                />
                                {getFormErrorMessage('phone')}
                            </div>
                            
                            <div className="field col-12 md:col-6">
                                <label htmlFor="password">Contraseña</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Password
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="Ingrese su nueva contraseña"
                                            toggleMask
                                            feedback={false}
                                        />
                                    )}
                                />
                                {getFormErrorMessage('password')}
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Password
                                            id={field.name}
                                            {...field}
                                            className={classNames({ 'p-invalid': fieldState.error })}
                                            placeholder="Confirme su nueva contraseña"
                                            toggleMask
                                            feedback={false}
                                        />
                                    )}
                                />
                                {getFormErrorMessage('confirmPassword')}
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="twoFactorAuth" className="block mb-2">Autenticación de dos factores</label>
                                <Controller
                                    name="twoFactorAuth"
                                    control={control}
                                    render={({ field }) => (
                                        <InputSwitch
                                            id={field.name}
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.value)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-12">
                                <Button 
                                    type="submit" 
                                    label="Guardar cambios" 
                                    className="w-auto" 
                                    loading={isUpdating}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
