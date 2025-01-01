export interface ICity {
    id: number;
    name: string;
    image: string;
  }
  
  export interface ICreateCity {
    name: string;
    image: string;
  }
  
  export interface IUpdateCity {
    id: number;
    name?: string;
    image?: string;
  }
  
  export interface IDeleteCity {
    id: number;
  }
  
  export interface IReadCity {
    id?: number;
  }
  