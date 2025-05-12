import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import type { Ingredient } from '@/models/ingredient.model';

interface IngredientFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentIngredient: Ingredient | null;
  onSuccess: () => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  visible,
  onVisibleChange,
  currentIngredient,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && currentIngredient) {
      form.setFieldsValue(currentIngredient);
    } else {
      form.resetFields();
    }
  }, [visible, currentIngredient, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Replace with actual API call
      console.log('Form values:', values);
      onSuccess();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title={currentIngredient ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu mới'}
      open={visible}
      onCancel={() => onVisibleChange(false)}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: 'other',
          minQuantity: 0,
        }}
      >
        <Form.Item
          name="code"
          label="Mã nguyên liệu"
          rules={[{ required: true, message: 'Vui lòng nhập mã nguyên liệu' }]}
        >
          <Input placeholder="Nhập mã nguyên liệu" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên nguyên liệu"
          rules={[{ required: true, message: 'Vui lòng nhập tên nguyên liệu' }]}
        >
          <Input placeholder="Nhập tên nguyên liệu" />
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
          <Input placeholder="Nhập đơn vị (kg, g, l, ...)" />
        </Form.Item>

        <Form.Item
          name="minQuantity"
          label="Số lượng tối thiểu"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tối thiểu' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả (nếu có)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IngredientForm;
