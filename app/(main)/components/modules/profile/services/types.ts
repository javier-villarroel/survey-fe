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
  status: boolean;
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
  userName: string;
  name: string;
  lastName: string;
  email: string;
  phoneCode?: string;
  phoneNumber?: string;
  roleId: number;
  password: string;
  status: boolean;
}

export interface IUpdateUserRequest {
  userName?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  roleId?: number;
  status?: boolean;
  password?: string;
}

// Tipos específicos para las respuestas de usuarios
export type IUserResponse = IApiResponse<IUser>;
export type IUsersListResponse = IApiResponse<IUser[]>; 