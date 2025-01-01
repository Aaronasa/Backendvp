// model/user-Model.ts
export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    token?: string | null;
    roleId: number;
  }
  
  export interface ICreateUser {
    username: string;
    email: string;
    password: string;
    roleId: number;
  }
  
  export interface IUpdateUser {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    token?: string | null;
    roleId?: number;
  }
  
  export interface IDeleteUser {
    id: number;
  }
  
  export interface IReadUser {
    id?: number;
  }

  export interface ILoginUser {
    email: string;
    password: string;
  }
  export interface ILogoutUser {
    userId: number;
  }