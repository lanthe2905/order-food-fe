import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space, message, Popconfirm, Row, Col, Typography, Input } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest } from 'umi';
import type { Ingredient } from '@/models/ingredient.model';
import IngredientForm from './components/IngredientForm';

const { Title } = Typography;

const IngredientPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [searchText, setSearchText] = useState('');

  const columns: ProColumns<Ingredient>[] = [
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
      title: 'Đơn vị',
      dataIndex: 'unit',
    },
    {
      title: 'Số lượng tối thiểu',
      dataIndex: 'minQuantity',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setCurrentIngredient(record);
            setIsFormVisible(true);
          }}
        >
          Sửa
        </Button>,
        <Popconfirm
          key="delete"
          title="Bạn có chắc chắn muốn xóa nguyên liệu này?"
          onConfirm={() => {
            message.success('Xóa nguyên liệu thành công');
            actionRef.current?.reload();
          }}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card>
        <ProTable<Ingredient>
          headerTitle="Danh mục nguyên liệu"
          actionRef={actionRef}
          rowKey="id"
          search={false}
          pagination={{
            pageSize: 10,
          }}
          toolBarRender={() => [
            <Input
              key="search"
              placeholder="Tìm kiếm nguyên liệu..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />,
            <Button
              type="primary"
              key="add"
              icon={<PlusOutlined />}
              onClick={() => {
                setCurrentIngredient(null);
                setIsFormVisible(true);
              }}
            >
              Thêm mới
            </Button>,
          ]}
          request={async () => {
            // TODO: Replace with actual API call
            const mockIngredients: Ingredient[] = [
              {
                id: '1',
                code: 'NL001',
                name: 'Thịt heo',
                category: 'meat',
                unit: 'kg',
                minQuantity: 10,
                description: 'Thịt heo tươi',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              // Add more mock data as needed
            ];

            const filteredData = mockIngredients.filter(
              (item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.code.toLowerCase().includes(searchText.toLowerCase())
            );

            return {
              data: filteredData,
              success: true,
              total: filteredData.length,
            };
          }}
          columns={columns}
        />
      </Card>

      <IngredientForm
        visible={isFormVisible}
        onVisibleChange={setIsFormVisible}
        currentIngredient={currentIngredient}
        onSuccess={() => {
          setIsFormVisible(false);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default IngredientPage;
