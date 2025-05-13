import { WarehouseStatus, IngredientCategory, IngredientUnit } from '@/enums/warehouse.enum';
import type { Warehouse } from '@/mock/warehouse';
import type { Ingredient } from '@/models/warehouse.model';

/**
 * Tính toán tỷ lệ sử dụng kho
 */
export const calculateUsagePercentage = (warehouse: Warehouse): number => {
  return Math.round((warehouse.currentUsage / warehouse.capacity) * 100);
};

/**
 * Kiểm tra kho có đang gần đầy không
 */
export const isWarehouseNearFull = (warehouse: Warehouse): boolean => {
  return warehouse.currentUsage > warehouse.capacity * 0.9;
};

/**
 * Lọc nguyên liệu theo danh mục
 */
export const filterIngredientsByCategory = (
  ingredients: Ingredient[],
  category: IngredientCategory
): Ingredient[] => {
  return ingredients.filter(ingredient => ingredient.category === category);
};

/**
 * Chuyển đổi đơn vị
 */
export const convertUnit = (
  value: number,
  fromUnit: IngredientUnit,
  toUnit: IngredientUnit
): number => {
  // Logic chuyển đổi đơn vị
  const conversions: Record<IngredientUnit, Record<IngredientUnit, number>> = {
    [IngredientUnit.KG]: {
      [IngredientUnit.G]: 1000,
      [IngredientUnit.L]: 1,
      [IngredientUnit.ML]: 1000,
      [IngredientUnit.PIECE]: 1,
      [IngredientUnit.PACK]: 1,
      [IngredientUnit.BOX]: 1,
      [IngredientUnit.OTHER]: 1,
    },
    // Thêm các chuyển đổi khác...
  };

  return value * (conversions[fromUnit][toUnit] || 1);
};
