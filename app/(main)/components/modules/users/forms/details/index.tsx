"use client";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import React from "react";
import { IUser } from "../../services/types";
import { UserForm } from "../components/UserForm";
import { IFormCreateUser } from "../../lib/schemas";

export interface UserDetailsProps {
    onSuccess: () => void;
    user: IUser;
    onCancel?: () => void;
}

export const UserDetails = ({ onSuccess, user, onCancel }: UserDetailsProps) => {
    const { updateUser, isLoading } = useUpdateUser();

    const handleSubmit = async (data: IFormCreateUser) => {
        const result = await updateUser(user.id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: `${data.phonePrefix}${data.phoneNumber}`
        });
        
        if (result) {
            onSuccess();
        }
    };

    return (
        <UserForm
            onSubmit={handleSubmit}
            onCancel={onCancel}
            initialData={user}
            isLoading={isLoading}
            mode="edit"
        />
    );
};
