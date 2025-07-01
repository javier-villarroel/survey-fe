"use client";
import React from "react";
import { useCreateUser } from "../../hooks/create/useCreateUser";
import { UserForm } from "../components/UserForm";

export interface CreateUserProps {
    onSuccess: () => void;
    onCancel?: () => void;
}

export const CreateUser = ({ onSuccess, onCancel }: CreateUserProps) => {
    const { createUser, isLoading } = useCreateUser();

    const handleSubmit = async (data: any) => {
        const result = await createUser(data);
        if (result) {
            onSuccess();
        }
    };

    return (
        <UserForm
            onSubmit={handleSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
            mode="create"
        />
    );
};