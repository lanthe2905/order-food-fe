import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { mockWarehouses, mockIngredients, type Warehouse } from '@/mock/warehouse';
import type { Ingredient } from '@/models/warehouse.model';
import IngredientForm from './components/IngredientForm';
import StockMovementForm from './components/StockMovementForm';
import WarehouseForm from './components/WarehouseForm';
import WarehouseList from './components/WarehouseList';
import WarehouseDetails from './components/WarehouseDetails';

const WarehousePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isStockFormVisible, setIsStockFormVisible] = useState(false);
  const [isWarehouseFormVisible, setIsWarehouseFormVisible] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleEditIngredient = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setIsFormVisible(true);
  };

  const handleDeleteIngredient = (ingredient: Ingredient) => {
    message.success('Xóa nguyên liệu khỏi kho thành công');
    actionRef.current?.reload();
  };

  const handleStockMovement = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setIsStockFormVisible(true);
  };

  const handleEditWarehouse = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsWarehouseFormVisible(true);
  };

  const handleDeleteWarehouse = (warehouse: Warehouse) => {
    message.success('Xóa kho thành công');
  };

  const handleSelectWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleBack = () => {
    setSelectedWarehouse(null);
  };

  const filteredWarehouses = mockWarehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchText.toLowerCase()) ||
    warehouse.code.toLowerCase().includes(searchText.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <PageContainer>
      {!selectedWarehouse ? (
        <WarehouseList
          actionRef={actionRef}
          warehouses={filteredWarehouses}
          searchText={searchText}
          viewMode={viewMode}
          onSearchChange={setSearchText}
          onViewModeChange={setViewMode}
          onEdit={handleEditWarehouse}
          onDelete={handleDeleteWarehouse}
          onSelect={handleSelectWarehouse}
        />
      ) : (
        <WarehouseDetails
          actionRef={actionRef}
          selectedWarehouse={selectedWarehouse}
          ingredients={mockIngredients[selectedWarehouse.id] || []}
          onBack={handleBack}
          onEdit={handleEditIngredient}
          onDelete={handleDeleteIngredient}
          onStockMovement={handleStockMovement}
        />
      )}

      <IngredientForm
        visible={isFormVisible}
        onVisibleChange={setIsFormVisible}
        ingredient={currentIngredient}
        warehouse={selectedWarehouse}
        onSuccess={() => {
          setIsFormVisible(false);
          actionRef.current?.reload();
        }}
      />

      <StockMovementForm
        visible={isStockFormVisible}
        onVisibleChange={setIsStockFormVisible}
        ingredient={currentIngredient}
        warehouse={selectedWarehouse}
        onSuccess={() => {
          setIsStockFormVisible(false);
          actionRef.current?.reload();
        }}
      />

      <WarehouseForm
        visible={isWarehouseFormVisible}
        onVisibleChange={setIsWarehouseFormVisible}
        warehouse={currentWarehouse}
        onSuccess={() => {
          setIsWarehouseFormVisible(false);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default WarehousePage;
