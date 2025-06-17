import { verifySignInOTPService } from '../../services/Auth/auth.services';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UseHandleOTPReturn {
    handleOTPComplete: (code: string, passToken: string) => Promise<boolean>;
    isVerifying: boolean;
}

export const useHandleOTP = (): UseHandleOTPReturn => {
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

    const handleOTPComplete = useCallback(async (code: string, passToken: string): Promise<boolean> => {
        if (code.length !== 4 || !passToken) {
            return false;
        }

        if (isVerifying) {
            return false;
        }

        try {
            setIsVerifying(true);
            const response = await verifySignInOTPService({
                code,
                passToken,
                event: 'OTP_USER_SIGNIN'
            });

            if ('error' in response) {
                toast.error(response.error);
                return false;
            }

            if (response.result) {
                // toast.success('Inicio de sesión exitoso');
                router.push('/'); // O la ruta que corresponda después del login
                return true;
            }

            toast.error('Código inválido');
            return false;
        } catch (error) {
            console.log(error)
            toast.error('Error al versificar el código');
            return false;
        } finally {
            setIsVerifying(false);
        }
    }, [isVerifying, router]);

    return {
        handleOTPComplete,
        isVerifying
    };
}; 