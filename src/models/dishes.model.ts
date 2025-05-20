// @src/models/dishes.model.ts
export type Dish = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  status: 'available' | 'out_of_stock' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
};
