import { Ingredient } from '@/models/warehouse.model';

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  location: string;
  capacity: number;
  currentUsage: number;
  status: 'active' | 'inactive';
  description?: string;
}

export const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    name: 'Kho Chính',
    code: 'WH001',
    location: 'Tầng 1',
    capacity: 1000,
    currentUsage: 750,
    status: 'active',
    description: 'Kho chính chứa nguyên liệu thường xuyên sử dụng',
  },
  {
    id: 2,
    name: 'Kho Lạnh',
    code: 'WH002',
    location: 'Tầng 2',
    capacity: 500,
    currentUsage: 300,
    status: 'active',
    description: 'Kho lạnh chứa nguyên liệu cần bảo quản lạnh',
  },
  {
    id: 3,
    name: 'Kho Khô',
    code: 'WH003',
    location: 'Tầng 1',
    capacity: 800,
    currentUsage: 400,
    status: 'active',
    description: 'Kho khô chứa nguyên liệu khô và gia vị',
  },
];

export const mockIngredients: Record<number, Ingredient[]> = {
  1: [
    {
      id: 1,
      name: 'Thịt heo',
      code: 'ING001',
      category: 'meat',
      unit: 'kg',
      quantity: 100,
      minQuantity: 20,
      maxQuantity: 200,
      price: 150000,
      supplier: 'Công ty TNHH Thực phẩm ABC',
      location: 'Kệ A1',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Thịt bò',
      code: 'ING002',
      category: 'meat',
      unit: 'kg',
      quantity: 50,
      minQuantity: 10,
      maxQuantity: 100,
      price: 350000,
      supplier: 'Công ty TNHH Thực phẩm ABC',
      location: 'Kệ A2',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ],
  2: [
    {
      id: 3,
      name: 'Cá hồi',
      code: 'ING003',
      category: 'seafood',
      unit: 'kg',
      quantity: 30,
      minQuantity: 5,
      maxQuantity: 50,
      price: 450000,
      supplier: 'Công ty TNHH Thủy sản XYZ',
      location: 'Tủ lạnh B1',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ],
  3: [
    {
      id: 4,
      name: 'Gạo',
      code: 'ING004',
      category: 'other',
      unit: 'kg',
      quantity: 200,
      minQuantity: 50,
      maxQuantity: 300,
      price: 25000,
      supplier: 'Công ty TNHH Lương thực 123',
      location: 'Kệ C1',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: 5,
      name: 'Nước mắm',
      code: 'ING005',
      category: 'spices',
      unit: 'l',
      quantity: 50,
      minQuantity: 10,
      maxQuantity: 100,
      price: 150000,
      supplier: 'Công ty TNHH Gia vị 456',
      location: 'Kệ C2',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ],
};
