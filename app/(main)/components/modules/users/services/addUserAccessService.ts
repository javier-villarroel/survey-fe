import { IUser } from "./types";
import { UserRoles } from "../lib/enums";
import { UsersService } from "./changeUserAddAccess";

export const addUserAccessService = async (user: IUser) => {
    const userId = typeof user.id === 'number' ? user.id.toString() : user.id;
    const payload = {
        roleId: UserRoles.ADMIN,
        action: user.action === "ASSIGN" ? 1 : 0 // 1 para asignar, 0 para revocar
    };

    return UsersService.updateUserAccess(userId, payload);
}; 