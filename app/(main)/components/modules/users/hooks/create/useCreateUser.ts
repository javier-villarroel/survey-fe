import { ICreateUserRequest, IUser } from "../../services";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUserService } from "../../services";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const processUserData = (userData: ICreateUserRequest): ICreateUserRequest => {
    return {
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim().toLowerCase(),
      phonePrefix: userData.phonePrefix,
      phoneNumber: userData.phoneNumber.trim(),
      status: userData.status
    };
  };

  const createUser = useCallback(async (userData: ICreateUserRequest): Promise<IUser | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Procesar y validar datos
      const processedData = processUserData(userData);

      // Crear usuario
      const user = await createUserService(processedData);

      if (!user) {
        setError("No se pudo crear el usuario");
        toast.error("No se pudo crear el usuario");
        return null;
      }

      // Invalidar la caché y esperar a que termine
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: 'all'
      });

      toast.success("Usuario creado correctamente");
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al crear usuario";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

  return {
    createUser,
    isLoading,
    error
  };
}; 