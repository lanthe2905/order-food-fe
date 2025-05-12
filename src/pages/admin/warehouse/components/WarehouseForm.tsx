import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { useRequest } from 'umi';
import type { Warehouse } from '@/mock/warehouse';
import { createWarehouse, updateWarehouse } from '@/services/warehouse.service';

interface WarehouseFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentWarehouse: Warehouse | null;
  onSuccess: () => void;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({
  visible,
  onVisibleChange,
  currentWarehouse,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const { run: handleSubmit, loading } = useRequest(
    currentWarehouse ? updateWarehouse : createWarehouse,
    {
      manual: true,
      onSuccess: () => {
        message.success(
          currentWarehouse ? 'Cập nhật kho thành công' : 'Thêm kho mới thành công',
        );
        onSuccess();
      },
    },
  );

  useEffect(() => {
    if (visible && currentWarehouse) {
      form.setFieldsValue(currentWarehouse);
    } else {
      form.resetFields();
    }
  }, [visible, currentWarehouse]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentWarehouse) {
        await handleSubmit(currentWarehouse.id, values);
      } else {
        await handleSubmit(values);
      }
    } catch (error) {
      // Form validation failed
    }
  };

  return (
    <Modal
      title={currentWarehouse ? 'Sửa thông tin kho' : 'Thêm kho mới'}
      visible={visible}
      onOk={handleOk}
      onCancel={() => onVisibleChange(false)}
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'active' }}
      >
        <Form.Item
          name="code"
          label="Mã kho"
          rules={[{ required: true, message: 'Vui lòng nhập mã kho' }]}
        >
          <Input placeholder="VD: WH001" />
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
          <Input placeholder="VD: Tầng 1, Khu A" />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Sức chứa"
          rules={[{ required: true, message: 'Vui lòng nhập sức chứa' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="currentUsage"
          label="Đã sử dụng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng đã sử dụng' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
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

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WarehouseForm;
