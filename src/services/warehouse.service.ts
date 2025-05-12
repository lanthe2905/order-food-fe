import { request } from 'umi';
import type {
  Ingredient,
  IngredientListResponse,
  IngredientResponse,
  IngredientOption,
  StockMovement
} from '@/models/warehouse.model';
import type { Warehouse } from '@/mock/warehouse';

const resource = 'api/v1/warehouse';

// Warehouse Management
export const fetchWarehouseList = async (): Promise<Warehouse[]> => {
  return request(`${resource}/warehouses`, {
    method: 'GET',
  });
};

export const fetchWarehouseById = async (id: number): Promise<Warehouse> => {
  return request(`${resource}/warehouses/${id}`, {
    method: 'GET',
  });
};

export const createWarehouse = async (data: Partial<Warehouse>): Promise<Warehouse> => {
  return request(`${resource}/warehouses`, {
    method: 'POST',
    data,
  });
};

export const updateWarehouse = async (id: number, data: Partial<Warehouse>): Promise<Warehouse> => {
  return request(`${resource}/warehouses/${id}`, {
    method: 'PUT',
    data,
  });
};

export const deleteWarehouse = async (id: number): Promise<void> => {
  return request(`${resource}/warehouses/${id}`, {
    method: 'DELETE',
  });
};

// Ingredient Management
export const fetchIngredientList = async (params?: any): Promise<IngredientListResponse> => {
  return request(`${resource}/ingredients`, {
    method: 'GET',
    params,
  });
};

export const fetchIngredientById = async (id: number): Promise<IngredientResponse> => {
  return request(`${resource}/ingredients/${id}`, {
    method: 'GET',
  });
};

export const createIngredient = async (data: Partial<Ingredient>): Promise<IngredientResponse> => {
  return request(`${resource}/ingredients`, {
    method: 'POST',
    data,
  });
};

export const updateIngredient = async (id: number, data: Partial<Ingredient>): Promise<IngredientResponse> => {
  return request(`${resource}/ingredients/${id}`, {
    method: 'PUT',
    data,
  });
};

export const deleteIngredient = async (id: number): Promise<void> => {
  return request(`${resource}/ingredients/${id}`, {
    method: 'DELETE',
  });
};

export const fetchIngredientOptions = async (): Promise<IngredientOption[]> => {
  const response = await request(`${resource}/ingredients/options`, {
    method: 'GET',
  });
  return response.data;
};

// Stock Movement
export const addStock = async (data: Partial<StockMovement>): Promise<void> => {
  return request(`${resource}/stock/in`, {
    method: 'POST',
    data,
  });
};

export const removeStock = async (data: Partial<StockMovement>): Promise<void> => {
  return request(`${resource}/stock/out`, {
    method: 'POST',
    data,
  });
};

export const fetchStockMovements = async (params?: any): Promise<{ data: StockMovement[]; total: number }> => {
  return request(`${resource}/stock/movements`, {
    method: 'GET',
    params,
  });
};
