export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    image: string;
  }
  
  export interface ICreateRestaurant {
    name: string;
    address: string;
    phone: string;
    image: string;
  }
  
  export interface IUpdateRestaurant {
    id: number;
    name?: string;
    address?: string;
    phone?: string;
    image?: string;
  }
  
  export interface IDeleteRestaurant {
    id: number;
  }
  
  export interface IReadRestaurant {
    id?: number;
  }

  export interface IRestaurantResponse {
    data: IRestaurant[];
  }