import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { useRequest } from 'umi';
import type { Ingredient } from '@/models/warehouse.model';
import { createIngredient, updateIngredient } from '@/services/warehouse.service';

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

  const { run: handleSubmit, loading } = useRequest(
    currentIngredient ? updateIngredient : createIngredient,
    {
      manual: true,
      onSuccess: () => {
        message.success(
          currentIngredient ? 'Cập nhật nguyên liệu thành công' : 'Thêm nguyên liệu thành công',
        );
        onSuccess();
      },
    },
  );

  useEffect(() => {
    if (visible && currentIngredient) {
      form.setFieldsValue(currentIngredient);
    } else {
      form.resetFields();
    }
  }, [visible, currentIngredient]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentIngredient) {
        await handleSubmit(currentIngredient.id, values);
      } else {
        await handleSubmit(values);
      }
    } catch (error) {
      // Form validation failed
    }
  };

  return (
    <Modal
      title={currentIngredient ? 'Sửa nguyên liệu' : 'Thêm nguyên liệu mới'}
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
            <Select.Option value="vegetables">Rau củ</Select.Option>
            <Select.Option value="meat">Thịt</Select.Option>
            <Select.Option value="seafood">Hải sản</Select.Option>
            <Select.Option value="spices">Gia vị</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="unit"
          label="Đơn vị"
          rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
        >
          <Select>
            <Select.Option value="kg">Kilogram (kg)</Select.Option>
            <Select.Option value="g">Gram (g)</Select.Option>
            <Select.Option value="l">Lít (l)</Select.Option>
            <Select.Option value="ml">Milliliter (ml)</Select.Option>
            <Select.Option value="pcs">Cái (pcs)</Select.Option>
          </Select>
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
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="supplier"
          label="Nhà cung cấp"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="location"
          label="Vị trí trong kho"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="expiryDate"
          label="Hạn sử dụng"
        >
          <DatePicker style={{ width: '100%' }} />
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

export default IngredientForm;
