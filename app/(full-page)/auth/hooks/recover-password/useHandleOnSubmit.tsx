import { recoverPasswordService, verifyOTPService } from "../../services/Auth/auth.services";
import { useState, useCallback } from "react";

interface UseOnSubmitReturn {
  onSubmit: (email: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  handleOTPComplete: (code: string) => Promise<boolean>;
  userId: number | null;
  passToken: string;
}

export const useOnSubmit = (): UseOnSubmitReturn => {
  const [passToken, setPassToken] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const onSubmit = async (email: string): Promise<boolean> => {
    try {
      const response = await recoverPasswordService({ email }) as any;
      if ('error' in response) {
        return false;
      }

      // Guardamos el passToken y userId para usarlos en la verificación
      setPassToken(response.result.otp.passToken);
      setUserId(response.result.userId);
      return true;
    } catch (error) {
      return false;
    }
  };

  const verifyOTP = useCallback(async (code: string): Promise<boolean> => {
    try {
      if (!passToken) {
        return false;
      }

      if (isVerifying) {
        return false;
      }

      setIsVerifying(true);
      const response = await verifyOTPService({ code, passToken });

      if ('error' in response) {
        return false;
      }

      return response.result || false;
    } catch (error) {
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [passToken, isVerifying]);

  const handleOTPComplete = useCallback(async (code: string): Promise<boolean> => {
    if (code.length === 4) {
      return await verifyOTP(code);
    }
    return false;
  }, [verifyOTP, passToken]);

  return { onSubmit, verifyOTP, handleOTPComplete, userId, passToken };
};
