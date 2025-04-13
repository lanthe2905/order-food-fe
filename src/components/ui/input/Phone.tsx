import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import type { InputProps } from 'antd'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing'

type Props = ProFormFieldItemProps<InputProps>

const UIPhoneInput: React.FC<Props> = (props) => {
  const { name, label, ...customProp } = props;

  return (
    <ProFormText
      {...customProp}
      name={name}
      label={label}
      fieldProps={{
        style: {
          width: '100%',
        },
        addonBefore: '+84',
        onKeyPress: (e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        },
        ...props.fieldProps,
      }}
      placeholder={'VD: 0987654321'}
    />
  );
};

export default UIPhoneInput;