import { ICreateUserRequest, IUser } from "../services/types";
import { createUserService } from "../services";

export class CreateUserController {
  /**
   * Procesa y valida los datos del usuario antes de crear
   */
  private processUserData(userData: ICreateUserRequest): ICreateUserRequest {
    return {
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim()
    };
  }

  /**
   * Crea un nuevo usuario
   */
  async createUser(userData: ICreateUserRequest): Promise<{
    success: boolean;
    user?: IUser;
    error?: string;
  }> {
    try {
      // Procesar y validar datos
      const processedData = this.processUserData(userData);

      // Crear usuario
      const user = await createUserService(processedData);

      if (!user) {
        return {
          success: false,
          error: "No se pudo crear el usuario",
        };
      }

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al crear usuario",
      };
    }
  }
} 