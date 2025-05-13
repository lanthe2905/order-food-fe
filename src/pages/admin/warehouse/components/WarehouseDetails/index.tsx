import React, { useState } from 'react';
import { Card, Button, Space, Typography, Input, Descriptions, Tag } from 'antd';
import { ArrowLeftOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import type { Warehouse } from '@/mock/warehouse';
import type { Ingredient } from '@/models/warehouse.model';
import useIngredientColumns from '../IngredientTable';
import WarehouseDashboard from '../WarehouseDashboard';

interface WarehouseDetailsProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
  selectedWarehouse: Warehouse;
  ingredients: Ingredient[];
  onBack: () => void;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
  onStockMovement: (ingredient: Ingredient) => void;
  onAddIngredient: () => void;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({
  actionRef,
  selectedWarehouse,
  ingredients,
  onBack,
  onEdit,
  onDelete,
  onStockMovement,
  onAddIngredient,
}) => {
  const [searchText, setSearchText] = useState('');
  const columns = useIngredientColumns({ onEdit, onDelete, onStockMovement });

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    ingredient.code.toLowerCase().includes(searchText.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchText.toLowerCase()) ||
    (ingredient.location || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
            Quay lại
          </Button>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {selectedWarehouse.name}
          </Typography.Title>
        </Space>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Mã kho" span={1}>
            {selectedWarehouse.code}
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí" span={1}>
            {selectedWarehouse.location}
          </Descriptions.Item>
          <Descriptions.Item label="Sức chứa" span={1}>
            {selectedWarehouse.capacity}
          </Descriptions.Item>
          <Descriptions.Item label="Đã sử dụng" span={1}>
            {selectedWarehouse.currentUsage}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={1}>
            <Tag color={selectedWarehouse.status === 'active' ? 'success' : 'error'}>
              {selectedWarehouse.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            {selectedWarehouse.description || 'Không có mô tả'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <WarehouseDashboard
        selectedWarehouse={selectedWarehouse}
        ingredients={ingredients}
      />

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm nguyên liệu..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddIngredient}
          >
            Thêm nguyên liệu
          </Button>
        </div>

        <ProTable<Ingredient>
          headerTitle="Danh sách nguyên liệu"
          actionRef={actionRef}
          rowKey="id"
          search={false}
          toolBarRender={false}
          dataSource={filteredIngredients}
          columns={columns}
        />
      </Card>
    </Space>
  );
};

export default WarehouseDetails;
