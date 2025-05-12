import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space, message, Popconfirm, Row, Col, Statistic, Progress, List, Typography, Input, Tabs, Badge, Descriptions } from 'antd';
import { PlusOutlined, InboxOutlined, AlertOutlined, ShoppingOutlined, EditOutlined, DeleteOutlined, SearchOutlined, AppstoreOutlined, BarsOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest } from 'umi';
import type { Ingredient, WarehouseIngredient } from '@/models/ingredient.model';
import { mockWarehouses, mockIngredients, type Warehouse } from '@/mock/warehouse';
import IngredientForm from './components/IngredientForm';
import StockMovementForm from './components/StockMovementForm';
import WarehouseForm from './components/WarehouseForm';

const { Title } = Typography;
const { TabPane } = Tabs;

const WarehousePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [currentIngredient, setCurrentIngredient] = useState<WarehouseIngredient | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isStockFormVisible, setIsStockFormVisible] = useState(false);
  const [isWarehouseFormVisible, setIsWarehouseFormVisible] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const columns: ProColumns<WarehouseIngredient>[] = [
    {
      title: 'Mã',
      dataIndex: ['ingredient', 'code'],
      copyable: true,
    },
    {
      title: 'Tên nguyên liệu',
      dataIndex: ['ingredient', 'name'],
    },
    {
      title: 'Danh mục',
      dataIndex: ['ingredient', 'category'],
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
      dataIndex: ['ingredient', 'unit'],
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
          onClick={() => {
            setCurrentIngredient(record);
            setIsFormVisible(true);
          }}
        >
          Sửa
        </Button>,
        <Button
          key="stock"
          type="link"
          onClick={() => {
            setCurrentIngredient(record);
            setIsStockFormVisible(true);
          }}
        >
          Nhập/Xuất kho
        </Button>,
        <Popconfirm
          key="delete"
          title="Bạn có chắc chắn muốn xóa nguyên liệu này khỏi kho?"
          onConfirm={() => {
            message.success('Xóa nguyên liệu khỏi kho thành công');
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

  const warehouseColumns: ProColumns<Warehouse>[] = [
    {
      title: 'Mã kho',
      dataIndex: 'code',
      copyable: true,
    },
    {
      title: 'Tên kho',
      dataIndex: 'name',
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
    },
    {
      title: 'Sức chứa',
      dataIndex: 'capacity',
      sorter: true,
    },
    {
      title: 'Đã sử dụng',
      dataIndex: 'currentUsage',
      sorter: true,
      render: (_, record) => (
        <Space>
          <span>{record.currentUsage}</span>
          <Progress
            percent={Math.round((record.currentUsage / record.capacity) * 100)}
            size="small"
            status={record.currentUsage > record.capacity * 0.9 ? 'exception' : 'active'}
          />
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: {
        active: { text: 'Hoạt động', status: 'Success' },
        inactive: { text: 'Không hoạt động', status: 'Error' },
      },
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="select"
          type="link"
          onClick={() => setSelectedWarehouse(record)}
        >
          Xem chi tiết
        </Button>,
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setCurrentWarehouse(record);
            setIsWarehouseFormVisible(true);
          }}
        >
          Sửa
        </Button>,
        <Popconfirm
          key="delete"
          title="Bạn có chắc chắn muốn xóa kho này?"
          onConfirm={() => {
            message.success('Xóa kho thành công');
          }}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const renderDashboard = () => {
    if (!selectedWarehouse) return null;

    const ingredients = mockIngredients[selectedWarehouse.id] || [];
    const totalValue = ingredients.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const lowStockItems = ingredients.filter(item => item.quantity <= item.minQuantity).length;

    return (
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số nguyên liệu"
              value={ingredients.length}
              prefix={<InboxOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng giá trị"
              value={totalValue}
              prefix="₫"
              formatter={(value) => `${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nguyên liệu sắp hết"
              value={lowStockItems}
              prefix={<AlertOutlined />}
              valueStyle={{ color: lowStockItems > 0 ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Mức độ sử dụng kho"
              value={Math.round((selectedWarehouse.currentUsage / selectedWarehouse.capacity) * 100)}
              prefix={<ShoppingOutlined />}
              suffix="%"
            />
            <Progress
              percent={Math.round((selectedWarehouse.currentUsage / selectedWarehouse.capacity) * 100)}
              status={selectedWarehouse.currentUsage > selectedWarehouse.capacity * 0.9 ? 'exception' : 'active'}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  const renderWarehouseList = () => {
    const filteredWarehouses = mockWarehouses.filter(warehouse =>
      warehouse.name.toLowerCase().includes(searchText.toLowerCase()) ||
      warehouse.code.toLowerCase().includes(searchText.toLowerCase()) ||
      warehouse.location.toLowerCase().includes(searchText.toLowerCase())
    );

    if (viewMode === 'grid') {
      return (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ marginBottom: 16 }}>
              <Input
                placeholder="Tìm kiếm kho..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Button
                icon={<BarsOutlined />}
                onClick={() => setViewMode('list')}
              >
                Xem dạng bảng
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setCurrentWarehouse(null);
                  setIsWarehouseFormVisible(true);
                }}
              >
                Thêm kho
              </Button>
            </Space>

            <Row gutter={[16, 16]}>
              {filteredWarehouses.map(warehouse => (
                <Col span={8} key={warehouse.id}>
                  <Card
                    hoverable
                    onClick={() => setSelectedWarehouse(warehouse)}
                    style={{
                      backgroundColor: selectedWarehouse?.id === warehouse.id ? '#f0f0f0' : 'white',
                    }}
                    actions={[
                      <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentWarehouse(warehouse);
                          setIsWarehouseFormVisible(true);
                        }}
                      >
                        Sửa
                      </Button>,
                      <Popconfirm
                        key="delete"
                        title="Bạn có chắc chắn muốn xóa kho này?"
                        onConfirm={(e) => {
                          e?.stopPropagation();
                          message.success('Xóa kho thành công');
                        }}
                      >
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Xóa
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Space>
                          {warehouse.name}
                          <Badge
                            status={warehouse.status === 'active' ? 'success' : 'error'}
                            text={warehouse.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                          />
                        </Space>
                      }
                      description={
                        <>
                          <p>Mã: {warehouse.code}</p>
                          <p>Vị trí: {warehouse.location}</p>
                          <Progress
                            percent={Math.round((warehouse.currentUsage / warehouse.capacity) * 100)}
                            size="small"
                            status={warehouse.currentUsage > warehouse.capacity * 0.9 ? 'exception' : 'active'}
                          />
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </Card>
      );
    }

    return (
      <ProTable<Warehouse>
        headerTitle="Danh sách kho"
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Input
            key="search"
            placeholder="Tìm kiếm kho..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />,
          <Button
            key="viewMode"
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode('grid')}
          >
            Xem dạng lưới
          </Button>,
          <Button
            type="primary"
            key="add"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentWarehouse(null);
              setIsWarehouseFormVisible(true);
            }}
          >
            Thêm kho
          </Button>,
        ]}
        request={async () => {
          return {
            data: filteredWarehouses,
            success: true,
            total: filteredWarehouses.length,
          };
        }}
        columns={warehouseColumns}
      />
    );
  };

  const renderWarehouseDetails = () => {
    if (!selectedWarehouse) return null;

    return (
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space style={{ marginBottom: 16 }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedWarehouse(null)}
            >
              Quay lại
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentWarehouse(selectedWarehouse);
                setIsWarehouseFormVisible(true);
              }}
            >
              Sửa kho
            </Button>
          </Space>

          <Descriptions title="Thông tin kho" bordered>
            <Descriptions.Item label="Mã kho" span={3}>
              {selectedWarehouse.code}
            </Descriptions.Item>
            <Descriptions.Item label="Tên kho" span={3}>
              {selectedWarehouse.name}
            </Descriptions.Item>
            <Descriptions.Item label="Vị trí" span={3}>
              {selectedWarehouse.location}
            </Descriptions.Item>
            <Descriptions.Item label="Sức chứa" span={3}>
              {selectedWarehouse.capacity}
            </Descriptions.Item>
            <Descriptions.Item label="Đã sử dụng" span={3}>
              <Space>
                <span>{selectedWarehouse.currentUsage}</span>
                <Progress
                  percent={Math.round((selectedWarehouse.currentUsage / selectedWarehouse.capacity) * 100)}
                  size="small"
                  status={selectedWarehouse.currentUsage > selectedWarehouse.capacity * 0.9 ? 'exception' : 'active'}
                />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              <Badge
                status={selectedWarehouse.status === 'active' ? 'success' : 'error'}
                text={selectedWarehouse.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              />
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    );
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={selectedWarehouse ? 8 : 24}>
          {selectedWarehouse ? renderWarehouseDetails() : renderWarehouseList()}
        </Col>
        {selectedWarehouse && (
          <Col span={16}>
            {renderDashboard()}
            <Card style={{ marginTop: 16 }}>
              <ProTable<WarehouseIngredient>
                headerTitle="Danh sách nguyên liệu trong kho"
                actionRef={actionRef}
                rowKey="id"
                search={{
                  labelWidth: 120,
                }}
                toolBarRender={() => [
                  <Button
                    type="primary"
                    key="primary"
                    onClick={() => {
                      setCurrentIngredient(null);
                      setIsFormVisible(true);
                    }}
                  >
                    <PlusOutlined /> Thêm nguyên liệu vào kho
                  </Button>,
                ]}
                request={async () => {
                  // TODO: Replace with actual API call
                  const data = mockIngredients[selectedWarehouse.id] || [];
                  return {
                    data,
                    success: true,
                    total: data.length,
                  };
                }}
                columns={columns}
              />
            </Card>
          </Col>
        )}
      </Row>

      <IngredientForm
        visible={isFormVisible}
        onVisibleChange={setIsFormVisible}
        currentIngredient={currentIngredient}
        onSuccess={() => {
          setIsFormVisible(false);
          actionRef.current?.reload();
        }}
      />

      <StockMovementForm
        visible={isStockFormVisible}
        onVisibleChange={setIsStockFormVisible}
        ingredient={currentIngredient}
        onSuccess={() => {
          setIsStockFormVisible(false);
          actionRef.current?.reload();
        }}
      />

      <WarehouseForm
        visible={isWarehouseFormVisible}
        onVisibleChange={setIsWarehouseFormVisible}
        currentWarehouse={currentWarehouse}
        onSuccess={() => {
          setIsWarehouseFormVisible(false);
          // Reload warehouse list
        }}
      />
    </PageContainer>
  );
};

export default WarehousePage;
