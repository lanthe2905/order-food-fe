// src/pages/admin/dishes/components/CreateDish.tsx
import { Dish } from '@/models/dishes.model';
import { ROUTES } from '@/utils/routes';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Col, Form, message, Row } from 'antd';
import React from 'react';
import Icons from './icons';
import useStyle from './style.style';
import UploadImage from './Upload';

const CreateDish: React.FC = () => {
  const { styles } = useStyle();

  const onFinish = async (values: Dish) => {
    // Handle form submission logic here
    console.log('Received values:', values);
    message.success('Dish created successfully!');
    // Add your API call logic here
  };

  const handleBack = () => {
    history.push(ROUTES.ADMIN.DISHES.LIST);
  };

  return (
    <PageContainer
      title={<div className={styles.title}>{Icons.ChefHatIcon} Tạo Công Thức Món Ăn Mới</div>}
      extra={
        <Button type="default" onClick={handleBack} icon={<ArrowLeftOutlined />}>
          Quay lại
        </Button>
      }
      style={{
        width: 'clamp(min(100%, 500px), 100%, 900px)',
      }}
    >
      <ProCard>
        <ProForm onFinish={onFinish} layout="vertical" initialValues={{ status: 'available' }}>
          <Row gutter={[16, 16]}>
            <Col md={12} sm={24} xs={24}>
              <ProFormText name="name" label="Tên Món Ăn" rules={[{ required: true, message: 'Please input the dish name!' }]} />

              <ProFormDigit name="price" label="Giá món ăn" rules={[{ required: true, message: 'Vui lòng nhập giá món ăn!' }]} min={0} />

              <ProFormSelect
                name="status"
                label="Status"
                options={[
                  { label: 'Available', value: 'available' },
                  { label: 'Out of Stock', value: 'out_of_stock' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
                rules={[{ required: true, message: 'Please select the status!' }]}
              />
            </Col>

            <Col md={12} sm={24} xs={24}>
              <Form.Item label="Hình Ảnh Món Ăn" name="image_url">
                <UploadImage />
              </Form.Item>
            </Col>
          </Row>

          <ProFormTextArea name="description" label="Mô Tả" />
          <ProFormTextArea name="description" label="Cách làm" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default CreateDish;
