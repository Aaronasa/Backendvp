export interface IFoodRestaurant {
    id: number;
    foodId: number;
    restaurantId: number;
    price: number;
  }
  
  export interface ICreateFoodRestaurant {
    foodId: number;
    restaurantId: number;
    price: number;
  }
  
  export interface IUpdateFoodRestaurant {
    id: number;
    foodId?: number;
    restaurantId?: number;
    price?: number;
  }
  
  export interface IDeleteFoodRestaurant {
    id: number;
  }
  
  export interface IReadFoodRestaurant {
    id?: number;
  }
  