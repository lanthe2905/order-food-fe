// src/pages/admin/dishes/components/CreateDish.tsx
import { Dish } from '@/models/dishes.model';
import { ROUTES } from '@/utils/routes';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Col, Form, message, Row, Typography } from 'antd';
import React from 'react';
import UploadImage from './components/Upload';
import Icons from './icons';
import useStyle from './style.style';

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
        <ProForm
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ status: 'available' }}
          submitter={{
            render(props, dom) {
              return <FooterToolbar>{dom}</FooterToolbar>;
            },
          }}
        >
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

          <Card title={'NGUYÊN LIỆU'}>
            <ProFormList
              name="users"
              initialValue={[
                {
                  useMode: 'chapter',
                },
              ]}
              creatorButtonProps={{
                position: 'top',
                creatorButtonText: 'Nguyên Liệu',
              }}
              creatorRecord={{
                useMode: 'none',
              }}
              containerStyle={{
                width: '100%',
              }}
            >
              <Row gutter={[16, 16]}>
                <Col md={12} sm={12} xs={24}>
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: 'Valid after stamping',
                      },
                      {
                        value: 'none',
                        label: 'Not effective',
                      },
                    ]}
                    name="useMode"
                    label="Contract agreement effective method"
                  />
                </Col>

                <Col md={6} sm={12} xs={24}>
                  <ProFormText name={'abc'} placeholder={'Số Lượng'} />
                </Col>

                <Col md={6} sm={12} xs={24}>
                  <Typography>G</Typography>
                </Col>
              </Row>
            </ProFormList>
          </Card>

          <Card title={'Toppings'} className="mt-1 mb-1">
            <ProFormList
              name="users"
              initialValue={[
                {
                  useMode: 'chapter',
                },
              ]}
              creatorButtonProps={{
                position: 'top',
                creatorButtonText: 'Nguyên Liệu',
              }}
              creatorRecord={{
                useMode: 'none',
              }}
              containerStyle={{
                width: '100%',
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: 'Valid after stamping',
                      },
                      {
                        value: 'none',
                        label: 'Not effective',
                      },
                    ]}
                    name="useMode"
                    label="Contract agreement effective method"
                  />
                </Col>

                <Col span={8}>
                  <ProFormText name={'abc'} label={'Số Lượng'} />
                </Col>
              </Row>
            </ProFormList>
          </Card>

          <ProFormSelect label={'Nhóm món ăn'} name={'group_id'} options={[]} />
          <ProFormTextArea name="description" label="Mô Tả" />
          <ProFormTextArea name="description" label="Cách làm" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default CreateDish;
