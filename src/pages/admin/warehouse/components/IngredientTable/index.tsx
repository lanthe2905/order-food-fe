import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import type { Ingredient } from '@/models/warehouse.model';

interface IngredientTableProps {
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
  onStockMovement: (ingredient: Ingredient) => void;
}

const useIngredientColumns = ({ onEdit, onDelete, onStockMovement }: IngredientTableProps): ProColumns<Ingredient>[] => {
  return [
    {
      title: 'Mã',
      dataIndex: 'code',
      copyable: true,
    },
    {
      title: 'Tên nguyên liệu',
      dataIndex: 'name',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      valueEnum: {
        meat: { text: 'Thịt' },
        seafood: { text: 'Hải sản' },
        vegetables: { text: 'Rau củ' },
        spices: { text: 'Gia vị' },
        other: { text: 'Khác' },
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      sorter: true,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        >
          Sửa
        </Button>,
        <Button
          key="stock"
          type="link"
          onClick={() => onStockMovement(record)}
        >
          Nhập/Xuất kho
        </Button>,
        <Popconfirm
          key="delete"
          title="Bạn có chắc chắn muốn xóa nguyên liệu này khỏi kho?"
          onConfirm={() => onDelete(record)}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ],
    },
  ];
};

export default useIngredientColumns;
