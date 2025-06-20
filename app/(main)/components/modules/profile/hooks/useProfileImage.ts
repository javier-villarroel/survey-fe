import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ProfileFormData } from '../lib/schemas';

interface UseProfileImageProps {
    setValue: UseFormSetValue<ProfileFormData>;
}

export const useProfileImage = ({ setValue }: UseProfileImageProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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