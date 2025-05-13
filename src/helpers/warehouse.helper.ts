import { WarehouseStatus, IngredientCategory, IngredientUnit, StockMovementType } from '@/enums/warehouse.enum';
import type { Warehouse } from '@/mock/warehouse';
import type { Ingredient } from '@/models/warehouse.model';
import { calculateUsagePercentage, isWarehouseNearFull } from '@/utils/warehouse.util';

/**
 * Tính toán tổng giá trị nguyên liệu trong kho
 */
export const calculateTotalInventoryValue = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((total, ingredient) => {
    return total + (ingredient.quantity * ingredient.price);
  }, 0);
};

/**
 * Phân tích xu hướng sử dụng nguyên liệu
 */
export const analyzeIngredientUsage = (ingredients: Ingredient[]) => {
  const analysis = {
    lowStock: [] as Ingredient[],
    overStock: [] as Ingredient[],
    expiringSoon: [] as Ingredient[],
    byCategory: {} as Record<IngredientCategory, number>,
  };

  ingredients.forEach(ingredient => {
    // Kiểm tra nguyên liệu sắp hết
    if (ingredient.quantity <= ingredient.minQuantity) {
      analysis.lowStock.push(ingredient);
    }

    // Kiểm tra nguyên liệu quá nhiều
    if (ingredient.quantity >= ingredient.maxQuantity) {
      analysis.overStock.push(ingredient);
    }

    // Thống kê theo danh mục
    analysis.byCategory[ingredient.category] = (analysis.byCategory[ingredient.category] || 0) + ingredient.quantity;
  });

  return analysis;
};

/**
 * Tối ưu hóa phân bố nguyên liệu giữa các kho
 */
export const optimizeWarehouseDistribution = (
  warehouses: Warehouse[],
  ingredients: Ingredient[]
): Record<string, Ingredient[]> => {
  const distribution: Record<string, Ingredient[]> = {};

  // Sắp xếp kho theo tỷ lệ sử dụng
  const sortedWarehouses = [...warehouses].sort((a, b) => {
    const usageA = calculateUsagePercentage(a);
    const usageB = calculateUsagePercentage(b);
    return usageA - usageB;
  });

  // Phân bố nguyên liệu
  ingredients.forEach(ingredient => {
    // Tìm kho phù hợp nhất
    const suitableWarehouse = sortedWarehouses.find(warehouse => {
      const isNearFull = isWarehouseNearFull(warehouse);
      const hasSpace = warehouse.currentUsage + ingredient.quantity <= warehouse.capacity;
      return !isNearFull && hasSpace;
    });

    if (suitableWarehouse) {
      if (!distribution[suitableWarehouse.id]) {
        distribution[suitableWarehouse.id] = [];
      }
      distribution[suitableWarehouse.id].push(ingredient);
    }
  });

  return distribution;
};

/**
 * Tạo báo cáo tồn kho
 */
export const generateInventoryReport = (
  warehouses: Warehouse[],
  ingredients: Ingredient[]
) => {
  const report = {
    totalWarehouses: warehouses.length,
    totalIngredients: ingredients.length,
    totalValue: calculateTotalInventoryValue(ingredients),
    warehouseStatus: {
      active: warehouses.filter(w => w.status === WarehouseStatus.ACTIVE).length,
      inactive: warehouses.filter(w => w.status === WarehouseStatus.INACTIVE).length,
    },
    usageAnalysis: warehouses.map(warehouse => ({
      id: warehouse.id,
      name: warehouse.name,
      usagePercentage: calculateUsagePercentage(warehouse),
      isNearFull: isWarehouseNearFull(warehouse),
    })),
    ingredientAnalysis: analyzeIngredientUsage(ingredients),
  };

  return report;
};
