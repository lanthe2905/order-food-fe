import React from 'react';
import { Card, Space, Input, Button, Row, Col, List, Typography, Tag, Progress } from 'antd';
import { SearchOutlined, AppstoreOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import type { Warehouse } from '@/mock/warehouse';
import useWarehouseColumns from '../hooks/useWarehouseColumns';

interface WarehouseListProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
  warehouses: Warehouse[];
  searchText: string;
  viewMode: 'list' | 'grid';
  onSearchChange: (value: string) => void;
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  onSelect: (warehouse: Warehouse) => void;
  onAdd: () => void;
}

const WarehouseList: React.FC<WarehouseListProps> = ({
  actionRef,
  warehouses,
  searchText,
  viewMode,
  onSearchChange,
  onViewModeChange,
  onEdit,
  onDelete,
  onSelect,
  onAdd,
}) => {
  const columns = useWarehouseColumns({ onEdit, onDelete, onSelect });

  const renderWarehouseCard = (warehouse: Warehouse) => (
    <Card
      hoverable
      style={{ marginBottom: 16 }}
      actions={[
        <Button type="link" onClick={() => onSelect(warehouse)}>
          Xem chi tiết
        </Button>,
        <Button type="link" onClick={() => onEdit(warehouse)}>
          Sửa
        </Button>,
        <Button type="link" danger onClick={() => onDelete(warehouse)}>
          Xóa
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {warehouse.name}
          </Typography.Title>
          <Tag color={warehouse.status === 'active' ? 'success' : 'error'}>
            {warehouse.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        </Space>
        <Typography.Text type="secondary">Mã: {warehouse.code}</Typography.Text>
        <Typography.Text type="secondary">Vị trí: {warehouse.location}</Typography.Text>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Sức chứa: {warehouse.currentUsage}/{warehouse.capacity}</Typography.Text>
          <Progress
            percent={Math.round((warehouse.currentUsage / warehouse.capacity) * 100)}
            status={warehouse.currentUsage > warehouse.capacity * 0.9 ? 'exception' : 'active'}
          />
        </Space>
        {warehouse.description && (
          <Typography.Text type="secondary">{warehouse.description}</Typography.Text>
        )}
      </Space>
    </Card>
  );

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Space>
            <Input
              placeholder="Tìm kiếm kho..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Button
              type={viewMode === 'grid' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => onViewModeChange('grid')}
            />
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<BarsOutlined />}
              onClick={() => onViewModeChange('list')}
            />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAdd}
          >
            Thêm kho mới
          </Button>
        </div>

        {viewMode === 'list' ? (
          <ProTable<Warehouse>
            headerTitle="Danh sách kho"
            actionRef={actionRef}
            rowKey="id"
            search={false}
            toolBarRender={false}
            dataSource={warehouses}
            columns={columns}
          />
        ) : (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={warehouses}
            renderItem={renderWarehouseCard}
          />
        )}
      </Space>
    </Card>
  );
};

export default WarehouseList;
