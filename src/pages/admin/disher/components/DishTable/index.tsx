import React from 'react';
import { Button, Popconfirm, message, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import type { Dish } from '@/models/dish.model';

interface DishTableProps {
  onEdit: (dish: Dish) => void;
  onDelete: (dish: Dish) => void;
}

const useDishColumns = ({ onEdit, onDelete }: DishTableProps): ProColumns<Dish>[] => {
  return [
    {
      title: 'Mã món',
      dataIndex: 'code',
      width: 120,
    },
    {
      title: 'Tên món',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      width: 150,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      width: 150,
      render: (price: number) => `${price.toLocaleString('vi-VN')}đ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Đang bán' : 'Ngừng bán'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa món này?"
            onConfirm={() => onDelete(record)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default useDishColumns;
