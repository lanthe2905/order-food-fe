import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import type { InputProps } from 'antd'
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing'
import { getMessage } from '@/util/common';

type Props = ProFormFieldItemProps<InputProps> & {
  required?: boolean
  inputType?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';
}

const UIProFormText: React.FC<Props> = (props) => {
  const { name, label, ...customProp } = props;

  return (
    <ProFormText
      {...customProp}
      name={name}
      label={label}
      rules={[
        {
          required: props.required ?? false,
          message: getMessage('required', props.label),
        },
        ...(props?.rules ?? [])
      ]}
      fieldProps={{
        style: {
          width: '100%',
        },

        onKeyPress: (e) => {
          // Xử lý nhập số
          if (props?.inputType == 'integer') {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }
        },
        ...props.fieldProps,
      }}
    />
  );
};

export default UIProFormText;