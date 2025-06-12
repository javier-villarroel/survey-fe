import { CreateUserController } from "../../controllers/createUserController";
import { ICreateUserRequest, IUser } from "../../services";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controller = useMemo(() => new CreateUserController(), []);

  const createUser = useCallback(async (userData: ICreateUserRequest): Promise<IUser | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await controller.createUser(userData);

      if (!result.success) {
        setError(result.error || "Error al crear usuario");
        toast.error(result.error || "Error al crear usuario");
        return null;
      }

      toast.success("Usuario creado correctamente");
      return result.user || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear usuario";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [controller]);

  return {
    createUser,
    isLoading,
    error
  };
}; 