import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface BtnDeleteProps {
  onConfirm: (record: any) => Promise<void>;
  onCancel?: () => void;
  title?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
  popconfirmProps?: React.ComponentProps<typeof Popconfirm>;
}

const UIBtnDelete: React.FC<BtnDeleteProps> = ({
  onConfirm,
  onCancel,
  title = 'Bạn chắc chắn?',
  buttonProps,
  popconfirmProps,
}) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={'Xoá'}
      {...popconfirmProps}
    >
      <Button type="link" icon={<DeleteOutlined />} {...buttonProps}>
        {buttonProps?.children ?? "Xoá"}
      </Button>
    </Popconfirm>
  );
};

export default UIBtnDelete;
