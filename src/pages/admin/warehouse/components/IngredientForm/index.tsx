import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import type { Ingredient } from '@/models/warehouse.model';
import type { Warehouse } from '@/mock/warehouse';

interface IngredientFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  ingredient: Ingredient | null;
  warehouse: Warehouse | null;
  onSuccess: () => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  visible,
  onVisibleChange,
  ingredient,
  warehouse,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && ingredient) {
      form.setFieldsValue(ingredient);
    } else {
      form.resetFields();
    }
  }, [visible, ingredient, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      message.success('Lưu nguyên liệu thành công');
      onSuccess();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title={ingredient ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu mới'}
      open={visible}
      onCancel={() => onVisibleChange(false)}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'active' }}
      >
        <Form.Item
          name="code"
          label="Mã nguyên liệu"
          rules={[{ required: true, message: 'Vui lòng nhập mã nguyên liệu' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên nguyên liệu"
          rules={[{ required: true, message: 'Vui lòng nhập tên nguyên liệu' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select>
            <Select.Option value="meat">Thịt</Select.Option>
            <Select.Option value="seafood">Hải sản</Select.Option>
            <Select.Option value="vegetables">Rau củ</Select.Option>
            <Select.Option value="spices">Gia vị</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="unit"
          label="Đơn vị"
          rules={[{ required: true, message: 'Vui lòng nhập đơn vị' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="minQuantity"
          label="Số lượng tối thiểu"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tối thiểu' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="maxQuantity"
          label="Số lượng tối đa"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tối đa' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => Number(value!.replace(/₫\s?|(,*)/g, ''))}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="supplier"
          label="Nhà cung cấp"
          rules={[{ required: true, message: 'Vui lòng nhập nhà cung cấp' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="location"
          label="Vị trí"
          rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select>
            <Select.Option value="active">Hoạt động</Select.Option>
            <Select.Option value="inactive">Không hoạt động</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IngredientForm;
