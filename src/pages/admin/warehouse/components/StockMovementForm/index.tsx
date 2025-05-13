import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import type { Ingredient } from '@/models/ingredient.model';
import type { Warehouse } from '@/mock/warehouse';

interface StockMovementFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  ingredient: Ingredient | null;
  warehouse: Warehouse | null;
  onSuccess: () => void;
}

const StockMovementForm: React.FC<StockMovementFormProps> = ({
  visible,
  onVisibleChange,
  ingredient,
  warehouse,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Call API to save stock movement
      onSuccess();
      onVisibleChange(false);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title="Nhập/Xuất kho"
      open={visible}
      onCancel={() => onVisibleChange(false)}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: 'in' }}
      >
        <Form.Item
          name="type"
          label="Loại"
          rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
        >
          <Select>
            <Select.Option value="in">Nhập kho</Select.Option>
            <Select.Option value="out">Xuất kho</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="note"
          label="Ghi chú"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockMovementForm;
