import { useState, useRef, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ProfileFormData } from '../lib/schemas';
import { IUser } from '../services/types';

interface UseProfileImageProps {
    setValue: UseFormSetValue<ProfileFormData>;
    user?: IUser | null;
}

export const useProfileImage = ({ setValue, user }: UseProfileImageProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user?.resources) {
            const profileImage = user.resources.find(resource => resource.type === 'profileImage');
            if (profileImage) {
                setPreviewImage(profileImage.url);
            }
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
                setValue('profileImage', file);
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        previewImage,
        fileInputRef,
        handleImageClick,
        handleImageChange
    };
}; 