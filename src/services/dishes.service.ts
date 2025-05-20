// @src/services/dishes.service.ts
import { Dish } from '@/models/dishes.model';
import { request } from '@umijs/max';

const resource = 'api/v1/dishes'; // Define the API endpoint

// Fetch the list of dishes
export const fetchDishes = async (params: { search: string; page: number; limit: number }): Promise<API.Rule<Dish[]>> => {
  return await request(resource, {
    method: 'GET',
    params: {
      search: params.search,
      page: params.page,
      limit: params.limit,
    },
  });
};

// Fetch a dish by ID
export const fetchDishById = async (id: number): Promise<API.Rule<Dish>> => {
  return request(`${resource}/${id}`, {
    method: 'GET',
  });
};

// Create a new dish
export const createDish = async (dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>): Promise<API.Rule<Dish>> => {
  return request(resource, {
    method: 'POST',
    data: dish,
  });
};

// Update an existing dish
export const updateDish = async (id: number, dish: Partial<Omit<Dish, 'id'>>): Promise<API.Rule<Dish>> => {
  return request(`${resource}/${id}`, {
    method: 'PUT',
    data: dish,
  });
};

// Delete a dish
export const deleteDish = async (id: number): Promise<API.Rule<void>> => {
  return request(`${resource}/${id}`, {
    method: 'DELETE',
  });
};
