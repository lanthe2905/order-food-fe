import { fetchDishes } from '@/services/dishes.service';
import { ROUTES } from '@/utils/routes';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { ProCard, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { Avatar, Button, Card, List } from 'antd';
import React from 'react';
import { history, useRequest } from 'umi';

const DISHES_SETTING = {
  pageSize: 15,
  current: 1,
};

const MOCK_DATA = [
  {
    id: 1,
    name: 'Pizza',
    description: 'Pizza with cheese and tomato sauce',
    image_url: 'https://img.freepik.com/free-psd/deliciously-appealing-margherita-pizza-transparent-background_84443-26494.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'Pizza with cheese and tomato sauce',
    image_url: 'https://img.freepik.com/free-psd/deliciously-appealing-margherita-pizza-transparent-background_84443-26494.jpg?semt=ais_hybrid&w=740',
  },
];

const DishList = ({}: any) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data, loading } = useRequest(() => fetchDishes({ search: searchTerm, page: 1, limit: DISHES_SETTING.pageSize }));

  const handleSearch = (values: any) => {
    setSearchTerm(values.name);
  };
  return (
    <>
      <QueryFilter
        defaultCollapsed
        split
        style={{
          backgroundColor: 'white',
          marginBottom: '16px',
        }}
        onFinish={handleSearch}
      >
        <ProFormText name="name" label="Tên món ăn" placeholder="Nhập tên món ăn" />
      </QueryFilter>

      <ProCard
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(ROUTES.ADMIN.DISHES.CREATE);
            }}
          >
            Thêm món ăn
          </Button>
        }
      >
        <List
          grid={{ gutter: 16, xxl: 3, xl: 3, lg: 1, md: 2, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={MOCK_DATA}
          pagination={{
            pageSize: DISHES_SETTING.pageSize,
            total: data?.total,
            onChange: (page) => {
              // Handle pagination
            },
          }}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ marginBottom: 16 }}
                actions={[
                  <Button
                    type="link"
                    onClick={() => {
                      /* Handle view details */
                    }}
                    icon={<EyeOutlined />}
                    key="view"
                  >
                    Xem chi tiết
                  </Button>,
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                      /* Handle edit */
                    }}
                    key="edit"
                  >
                    Sửa
                  </Button>,
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      /* Handle delete */
                    }}
                    key="delete"
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image_url} shape="square" size={90} />}
                  title={<a href="#">{item.name}</a>}
                  description={
                    <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.description}>
                      {item.description}
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </ProCard>
    </>
  );
};

export default DishList;
