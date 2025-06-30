export interface IUser {
  id: number;
  userName: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  role: {
    id: number;
    name: string;
    roleProcess: any[];
  };
  status: "ACTIVE" | "BLOQUED";
  createdAt: string;
  updatedAt: string;
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

export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | number;
  roleId?: number;
  status?: boolean;
  password?: string;
}

// Tipos específicos para las respuestas de usuarios
export type IUserResponse = IApiResponse<IUser>;
export type IUsersListResponse = IApiResponse<IUser[]>; 