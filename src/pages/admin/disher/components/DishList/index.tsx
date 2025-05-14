import React, { useState } from 'react';
import { Card, Button, Space, Typography, Input, Row, Col, List, Avatar, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import type { Dish } from '@/models/dish.model';
import useDishColumns from '../DishTable';

const { Title } = Typography;

interface DishListProps {
  actionRef: React.MutableRefObject<ActionType | undefined>;
  dishes: Dish[];
  onEdit: (dish: Dish) => void;
  onDelete: (dish: Dish) => void;
  onAdd: () => void;
}

const DishList: React.FC<DishListProps> = ({
  actionRef,
  dishes,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const columns = useDishColumns({ onEdit, onDelete });

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchText.toLowerCase()) ||
      dish.code.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Tìm kiếm món ăn..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode('grid')}
            type={viewMode === 'grid' ? 'primary' : 'default'}
          />
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode('list')}
            type={viewMode === 'list' ? 'primary' : 'default'}
          />
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          Thêm món ăn
        </Button>
      </div>

      {viewMode === 'list' ? (
        <ProTable<Dish>
          headerTitle="Danh sách món ăn"
          actionRef={actionRef}
          rowKey="id"
          search={false}
          toolBarRender={false}
          dataSource={filteredDishes}
          columns={columns}
        />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          dataSource={filteredDishes}
          renderItem={(dish) => (
            <List.Item>
              <Card
                hoverable
                cover={dish.image ? <img alt={dish.name} src={dish.image} /> : null}
                actions={[
                  <Button type="link" onClick={() => onEdit(dish)}>
                    Chỉnh sửa
                  </Button>,
                  <Button type="link" danger onClick={() => onDelete(dish)}>
                    Xóa
                  </Button>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar>{dish.name[0]}</Avatar>}
                  title={dish.name}
                  description={
                    <Space direction="vertical" size="small">
                      <div>Mã: {dish.code}</div>
                      <div>Giá: {dish.price.toLocaleString('vi-VN')}đ</div>
                      <div>Danh mục: {dish.category}</div>
                      <Tag color={dish.status === 'active' ? 'green' : 'red'}>
                        {dish.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                      </Tag>
                    </Space>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default DishList;
