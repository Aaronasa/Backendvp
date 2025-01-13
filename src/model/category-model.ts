export interface ICategory {
    id: number;
    name: string;
  }
  
  export interface ICreateCategory {
    name: string;
  }
  
  export interface IUpdateCategory {
    id: number;
    name?: string;
  }
  
  export interface IDeleteCategory {
    id: number;
  }
  
  export interface IReadCategory {
    id?: number;
  }
  