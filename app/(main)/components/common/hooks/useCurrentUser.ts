import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';

export const useCurrentUser = () => {
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

    const validateAndFormatEmail = (email: string | null): string | null => {
        if (!email) return null;
        try {
            const trimmedEmail = email.toLowerCase().trim();
            return trimmedEmail.includes('@') ? trimmedEmail : null;
        } catch (error) {
            console.error('Error formatting email:', error);
            return null;
        }
    };

    const updateCurrentUserEmail = () => {
        const email = getCookie('email') || null;
        const validEmail = validateAndFormatEmail(email);
        if (validEmail !== currentUserEmail) {
            setCurrentUserEmail(validEmail);
        }
    };

    useEffect(() => {
        updateCurrentUserEmail();

        const handleFocus = () => {
            updateCurrentUserEmail();
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'email') {
                updateCurrentUserEmail();
            }
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('storage', handleStorageChange);
        
        const interval = setInterval(updateCurrentUserEmail, 5000);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [currentUserEmail]);

    return { currentUserEmail, updateCurrentUserEmail };
}; 