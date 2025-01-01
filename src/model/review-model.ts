export interface IReview {
    id: number;
    userId: number;
    restaurantId: number;
    content: string;
    rating: number;
    createdAt: Date;
  }
  
  export interface ICreateReview {
    userId: number;
    restaurantId: number;
    content: string;
    rating: number;
  }
  
  export interface IUpdateReview {
    id: number;
    content?: string;
    rating?: number;
  }
  
  export interface IDeleteReview {
    id: number;
  }
  
  export interface IReadReview {
    id?: number;
    restaurantId?: number;
  }