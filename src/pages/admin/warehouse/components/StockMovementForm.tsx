import React from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { useRequest } from 'umi';
import type { Ingredient } from '@/models/warehouse.model';
import { addStock, removeStock } from '@/services/warehouse.service';

interface StockMovementFormProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  ingredient: Ingredient | null;
  onSuccess: () => void;
}

const StockMovementForm: React.FC<StockMovementFormProps> = ({
  visible,
  onVisibleChange,
  ingredient,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const { run: handleSubmit, loading } = useRequest(
    (type: 'in' | 'out', data: any) => (type === 'in' ? addStock(data) : removeStock(data)),
    {
      manual: true,
      onSuccess: () => {
        message.success('Cập nhật kho thành công');
        onSuccess();
      },
    },
  );

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!ingredient) return;

      await handleSubmit(values.type, {
        ...values,
        ingredientId: ingredient.id,
      });
    } catch (error) {
      // Form validation failed
    }
  };

  return (
    <Modal
      title="Nhập/Xuất kho"
      visible={visible}
      onOk={handleOk}
      onCancel={() => onVisibleChange(false)}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: 'in' }}
      >
        <Form.Item
          name="type"
          label="Loại giao dịch"
          rules={[{ required: true, message: 'Vui lòng chọn loại giao dịch' }]}
        >
          <Select>
            <Select.Option value="in">Nhập kho</Select.Option>
            <Select.Option value="out">Xuất kho</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng' },
            {
              validator: async (_, value) => {
                if (form.getFieldValue('type') === 'out' && ingredient && value > ingredient.quantity) {
                  throw new Error('Số lượng xuất không được vượt quá số lượng trong kho');
                }
              },
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            addonAfter={ingredient?.unit}
          />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Lý do"
          rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="reference"
          label="Mã tham chiếu"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockMovementForm;
