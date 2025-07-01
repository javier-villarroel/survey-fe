"use client";

import { PhonePrefixSelect } from "@/app/(main)/components/common/components/PhonePrefixSelect";
import { useInstanceForm } from "@/app/(main)/components/common/hooks/useInstanceForm";
import { createUserSchema, IFormCreateUser } from "../../lib/schemas";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { IUser } from "../../services";
import React from "react";

export interface UserFormProps {
    onSubmit: (data: IFormCreateUser) => Promise<void>;
    onCancel?: () => void;
    initialData?: IUser;
    isLoading?: boolean;
    mode: 'create' | 'edit';
}

export const UserForm = ({ onSubmit, onCancel, initialData, isLoading, mode }: UserFormProps) => {
    const defaultValues: IFormCreateUser = {
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        phonePrefix: initialData?.phone?.substring(0, 4) || "0414",
        phoneNumber: initialData?.phone?.substring(4) || "",
        status: initialData?.status || "ACTIVE",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useInstanceForm<IFormCreateUser>(createUserSchema, defaultValues);

    const getFormErrorMessage = (name: keyof IFormCreateUser) => {
        const errorMessage = errors[name]?.message;
        return errorMessage ? (
            <small className="p-error">{String(errorMessage)}</small>
        ) : null;
    };

    const onSubmitForm = (data: IFormCreateUser) => {
        const formattedData = {
            ...data,
            phone: `${data.phonePrefix}${data.phoneNumber}`,
        };
        onSubmit(formattedData);
    };

    return (
        <div className="card p-fluid">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="grid">
                    <div className="col-12">
                        <div className="field">
                            <span className="p-float-label p-input-icon-left">
                                <i className="pi pi-user" />
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
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
                    </div>

                    <div className="col-12">
                        <div className="field">
                            <span className="p-float-label p-input-icon-left">
                                <i className="pi pi-user" />
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
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
                    </div>

                    <div className="col-12">
                        <div className="field">
                            <span className="p-float-label p-input-icon-left">
                                <i className="pi pi-envelope" />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
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
                    </div>

                    <div className="col-12">
                        <div className="field">
                            <div className="flex gap-2">
                                <div className="w-[140px]">
                                    <Controller
                                        name="phonePrefix"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <PhonePrefixSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!fieldState.error}
                                            />
                                        )}
                                    />
                                    {getFormErrorMessage("phonePrefix")}
                                </div>
                                <div className="flex-1">
                                    <span className="p-float-label p-input-icon-left">
                                        <i className="pi pi-phone" />
                                        <Controller
                                            name="phoneNumber"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <InputText
                                                    id={field.name}
                                                    {...field}
                                                    className={classNames({
                                                        "p-invalid": fieldState.error,
                                                    })}
                                                    autoComplete="off"
                                                    maxLength={7}
                                                    keyfilter="pint"
                                                />
                                            )}
                                        />
                                        <label htmlFor="phoneNumber" className="font-medium">Número*</label>
                                    </span>
                                    {getFormErrorMessage("phoneNumber")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                    <Button
                        type="submit"
                        label={mode === 'create' ? "Crear" : "Guardar"}
                        icon="pi pi-save"
                        loading={isLoading}
                        size="small"
                        style={{
                            backgroundColor: '#000e28',
                            borderColor: '#000e28',
                            marginRight: '8px',
                        }}
                    />
                    {onCancel && (
                        <Button
                            type="button"
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={onCancel}
                            severity="secondary"
                            size="small"
                            outlined
                        />
                    )}
                </div>
            </form>
        </div>
    );
}; 