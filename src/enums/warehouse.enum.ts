export enum WarehouseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum WarehouseType {
  MAIN = 'main',
  BRANCH = 'branch',
  TEMPORARY = 'temporary',
}

export enum StockMovementType {
  IMPORT = 'import',
  EXPORT = 'export',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
}

export enum IngredientCategory {
  VEGETABLE = 'vegetable',
  MEAT = 'meat',
  SEAFOOD = 'seafood',
  SPICE = 'spice',
  DRY_GOODS = 'dry_goods',
  BEVERAGE = 'beverage',
  OTHER = 'other',
}

export enum IngredientUnit {
  KG = 'kg',
  G = 'g',
  L = 'l',
  ML = 'ml',
  PIECE = 'piece',
  PACK = 'pack',
  BOX = 'box',
  OTHER = 'other',
}
