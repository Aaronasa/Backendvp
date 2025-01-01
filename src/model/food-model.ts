export interface IFood {
    id: number;
    name: string;
    description: string;
    ingredients: string;
    image: string;
    categoryId: number;
    cityId: number;
  }
  
  export interface ICreateFood {
    name: string;
    description: string;
    ingredients: string;
    image: string;
    categoryId: number;
    cityId: number;
  }
  
  export interface IUpdateFood {
    id: number;
    name?: string;
    description?: string;
    ingredients?: string;
    image?: string;
    categoryId?: number;
    cityId?: number;
  }
  
  export interface IDeleteFood {
    id: number;
  }
  
  export interface IReadFood {
    id?: number;
  }
  