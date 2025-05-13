import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import type { Warehouse } from '@/mock/warehouse';
import type { Ingredient } from '@/models/warehouse.model';

interface WarehouseDashboardProps {
  selectedWarehouse: Warehouse;
  ingredients: Ingredient[];
}

const WarehouseDashboard: React.FC<WarehouseDashboardProps> = ({
  selectedWarehouse,
  ingredients,
}) => {
  const totalIngredients = ingredients.length;
  const lowStockIngredients = ingredients.filter(
    (ingredient) => ingredient.quantity <= ingredient.minQuantity
  ).length;
  const outOfStockIngredients = ingredients.filter(
    (ingredient) => ingredient.quantity === 0
  ).length;

  const capacityPercentage = (selectedWarehouse.currentUsage / selectedWarehouse.capacity) * 100;

  return (
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số nguyên liệu"
              value={totalIngredients}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nguyên liệu sắp hết"
              value={lowStockIngredients}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nguyên liệu hết hàng"
              value={outOfStockIngredients}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dung lượng kho"
              value={selectedWarehouse.currentUsage}
              suffix={`/ ${selectedWarehouse.capacity}`}
            />
            <Progress
              percent={capacityPercentage}
              status={capacityPercentage > 90 ? 'exception' : 'normal'}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default WarehouseDashboard;
