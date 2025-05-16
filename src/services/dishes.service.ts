// @src/services/dishes.service.ts
import { request } from "@umijs/max";
import { Dish } from "@/models/dishes.model";

const resource = 'api/v1/dishes'; // Define the API endpoint

// Fetch the list of dishes
export const fetchDishes = async (): Promise<Dish[]> => {
  return request<Dish[]>(resource, {
    method: 'GET',
  });
};

// Fetch a dish by ID
export const fetchDishById = async (id: number): Promise<Dish> => {
  return request<Dish>(`${resource}/${id}`, {
    method: 'GET',
  });
};

// Create a new dish
export const createDish = async (dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>): Promise<Dish> => {
  return request<Dish>(resource, {
    method: 'POST',
    data: dish,
  });
};

// Update an existing dish
export const updateDish = async (id: number, dish: Partial<Omit<Dish, 'id'>>): Promise<Dish> => {
  return request<Dish>(`${resource}/${id}`, {
    method: 'PUT',
    data: dish,
  });
};

// Delete a dish
export const deleteDish = async (id: number): Promise<void> => {
  return request<void>(`${resource}/${id}`, {
    method: 'DELETE',
  });
};