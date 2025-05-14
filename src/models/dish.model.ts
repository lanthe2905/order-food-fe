export interface Dish {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  status: 'active' | 'inactive';
  ingredients: DishIngredient[];
  createdAt: string;
  updatedAt: string;
}

export interface DishIngredient {
  id: number;
  dishId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
}

export interface DishCategory {
  id: number;
  name: string;
  description?: string;
}

export interface DishListResponse {
  data: Dish[];
  total: number;
}

export interface DishResponse {
  data: Dish;
}
