import { UserStatus } from "../lib/enums";

export interface IUser {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: {
    id: number;
    name: string;
    roleProcess: any[];
  };
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  action?: "ASSIGN" | "UNASSIGN";
}

export interface IPagination {
  count: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: boolean | number;
  offset: number;
  page: number;
  pagingCounter: number;
  perPage: number;
  prevPage: boolean | number;
  skip: number;
  totalDocs: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  info: {
    status: number;
    message: string;
    message_to_show?: string;
    code: string;
  };
  pagination: IPagination;
  result: T;
}

export interface IUserResponse {
  result: IUser;
}

export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
  phone?: string;
  status?: string;
}

export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  roleId?: number;
  status?: boolean;
  password?: string;
}

export interface IChangeUserStatusRequest {
  status: UserStatus;
}

// Tipos específicos para las respuestas de usuarios
export type IUsersListResponse = IApiResponse<IUser[]>; 