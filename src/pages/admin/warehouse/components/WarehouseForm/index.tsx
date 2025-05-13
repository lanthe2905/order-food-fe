import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import type { Warehouse } from '@/mock/warehouse';

interface WarehouseFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  warehouse: Warehouse | null;
  onSuccess: () => void;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({
  visible,
  onVisibleChange,
  warehouse,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Call API to save warehouse
      onSuccess();
      onVisibleChange(false);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title={warehouse ? 'Sửa kho' : 'Thêm kho mới'}
      open={visible}
      onCancel={() => onVisibleChange(false)}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={warehouse || { status: 'active' }}
      >
        <Form.Item
          name="code"
          label="Mã kho"
          rules={[{ required: true, message: 'Vui lòng nhập mã kho' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên kho"
          rules={[{ required: true, message: 'Vui lòng nhập tên kho' }]}
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
          name="capacity"
          label="Sức chứa"
          rules={[{ required: true, message: 'Vui lòng nhập sức chứa' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
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

export default WarehouseForm;
