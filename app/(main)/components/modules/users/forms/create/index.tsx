"use client";

import { IUser } from "../../services/types";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { toast } from "sonner";
import React from "react";
import { useCreateUser } from "../../hooks/create/useCreateUser";

export interface CreateUserProps {
    onSuccess: () => void;
    user?: IUser | null;
    onCancel?: () => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export const CreateUser = ({ onSuccess, user, onCancel }: CreateUserProps) => {
    const { createUser, isLoading: isCreating } = useCreateUser();
    const { updateUser, isLoading: isUpdating } = useUpdateUser();
    const isEditing = !!user;
    const isLoading = isCreating || isUpdating;

    const defaultValues: FormData = {
        firstName: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues });

    const onSubmit = async (data: FormData) => {
        try {
            let result;
            if (isEditing && user) {
                result = await updateUser(user.id, {
                    name: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone ? Number(data.phone) : undefined           
                });
            } else {
                result = await createUser(data);
            }
            
            if (result) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(isEditing ? 'Error al actualizar usuario' : 'Error al crear usuario');
        }
    };

    const getFormErrorMessage = (name: keyof FormData) => {
        const errorMessage = errors[name]?.message;
        return errorMessage ? (
            <small className="p-error">{String(errorMessage)}</small>
        ) : null;
    };

    return (
        <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="field">
                        <span className="p-float-label p-input-icon-left">
                            <i className="pi pi-user" />
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: "El nombre es requerido" }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        className={classNames("w-full", {
                                            "p-invalid": fieldState.error,
                                        })}
                                        autoComplete="off"
                                    />
                                )}
                            />
                            <label htmlFor="firstName" className="font-medium">Nombre*</label>
                        </span>
                        {getFormErrorMessage("firstName")}
                    </div>

                    <div className="field">
                        <span className="p-float-label p-input-icon-left">
                            <i className="pi pi-user" />
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: "El apellido es requerido" }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        className={classNames("w-full", {
                                            "p-invalid": fieldState.error,
                                        })}
                                        autoComplete="off"
                                    />
                                )}
                            />
                            <label htmlFor="lastName" className="font-medium">Apellido*</label>
                        </span>
                        {getFormErrorMessage("lastName")}
                    </div>

                    <div className="field">
                        <span className="p-float-label p-input-icon-left">
                            <i className="pi pi-envelope" />
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "El email es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Email inválido. Ej: usuario@dominio.com",
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        className={classNames("w-full", {
                                            "p-invalid": fieldState.error,
                                        })}
                                        autoComplete="off"
                                    />
                                )}
                            />
                            <label htmlFor="email" className="font-medium">Email*</label>
                        </span>
                        {getFormErrorMessage("email")}
                    </div>

                    <div className="field">
                        <span className="p-float-label p-input-icon-left">
                            <i className="pi pi-phone" />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ 
                                    required: "El teléfono es requerido",
                                    pattern: {
                                        value: /^\+[1-9]\d{1,14}$/,
                                        message: "Formato inválido. Ej: +584143654288"
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        className={classNames("w-full", {
                                            "p-invalid": fieldState.error,
                                        })}
                                        autoComplete="off"
                                        placeholder="+584143654288"
                                    />
                                )}
                            />
                            <label htmlFor="phone" className="font-medium">Teléfono*</label>
                        </span>
                        {getFormErrorMessage("phone")}
                    </div>
                </div>

                <div className="col-span-2 flex justify-center space-x-2 mt-6">
                    <Button
                        type="submit"
                        label={isEditing ? "Guardar cambios" : "Crear"}
                        icon="pi pi-save"
                        loading={isLoading}
                        size="small"
                        style={{
                            backgroundColor: '#000e28',
                            borderColor: '#000e28'
                        }}
                    />
                    {onCancel && (
                        <Button
                            type="button"
                            label="Cancelar"
                            icon="pi pi-times"
                            severity="secondary"
                            outlined
                            size="small"
                            onClick={onCancel}
                        />
                    )}
                </div>
            </form>
        </div>
    );
};