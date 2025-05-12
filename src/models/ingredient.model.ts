export interface Ingredient {
  id: string;
  code: string;
  name: string;
  category: 'meat' | 'seafood' | 'vegetables' | 'spices' | 'other';
  unit: string;
  minQuantity: number;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseIngredient {
  id: string;
  ingredientId: string;
  warehouseId: string;
  quantity: number;
  location: string;
  lastUpdated: string;
}

export interface IngredientMovement {
  id: string;
  ingredientId: string;
  warehouseId: string;
  type: 'in' | 'out' | 'transfer';
  quantity: number;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  note?: string;
  createdAt: string;
  createdBy: string;
}
