export interface Ingredient {
  id: number;
  name: string;
  code: string;
  category: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  price: number;
  supplier?: string;
  location?: string;
  expiryDate?: string;
  status: 'active' | 'inactive';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IngredientCategory {
  id: number;
  name: string;
  description?: string;
}

export interface IngredientOption {
  value: number;
  label: string;
  unit: string;
}

export interface IngredientListResponse {
  data: Ingredient[];
  total: number;
}

export interface IngredientResponse {
  data: Ingredient;
}

export interface StockMovement {
  id: number;
  ingredientId: number;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  reference?: string;
  createdAt: string;
  createdBy: number;
}