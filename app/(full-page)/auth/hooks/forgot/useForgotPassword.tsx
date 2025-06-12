import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnSubmit } from '../recover-password/useHandleOnSubmit';

interface UseForgotPasswordReturn {
    email: string;
    token: string;
    showModal: boolean;
    handleEmailChange: (value: string) => void;
    handleEmailSubmit: () => Promise<void>;
    handleTokenChange: (value: string) => void;
    handleModalClose: () => void;
    handleNavigateToLogin: () => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('');

    const { onSubmit, handleOTPComplete } = useOnSubmit();

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handleEmailSubmit = async () => {
        const success = await onSubmit(email);
        if (success) {
            setShowModal(true);
        }
    };

    const handleTokenChange = (value: string) => {
        setToken(value);
        if (value.length === 4) {
            handleOTPComplete(value).then(success => {
                if (success) {
                    setShowModal(false);
                    router.push('/auth/reset-password&token=2');
                }
            }).catch(error => {
                console.error('Error al verificar el código:', error);
            });
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleNavigateToLogin = () => {
        router.push('/auth/login');
    };

    return {
        email,
        token,
        showModal,
        handleEmailChange,
        handleEmailSubmit,
        handleTokenChange,
        handleModalClose,
        handleNavigateToLogin
    };
}; 