import { getMessage } from '@/utils/common';
import { ProFormDatePicker } from '@ant-design/pro-components';
import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import type { DatePickerProps } from 'antd';

type Props = {
  format?: string;
} & ProFormFieldItemProps<DatePickerProps>;

const UIProFormDatePicker = (props: Props) => {
  const { fieldProps, ...customProps } = props;
  const format = props.format ?? 'YYYY-MM-DD';

  // Nếu được truyền format rồi thì xoá fieldProps đi
  // Nếu chưa truyền format thì cho phép custom theo ý muốn
  if (props.format) {
    delete props?.fieldProps?.format;
  }

  return (
    <ProFormDatePicker
      fieldProps={{
        style: {
          width: '100%',
        },
        format: {
          format: format,
          type: 'mask',
        },
        ...fieldProps,
      }}
      rules={[
        {
          required: props.required ?? false,
          message: getMessage('required', props.label),
        },
      ]}
      placeholder={'dd/mm/yyyy'}
      transform={(value) => {
        if (typeof value == 'string') {
          return { [props.name]: value };
        }

        return { [props.name]: value?.format?.('YYYY-MM-DD') };
      }} // Convert trước khi submit
      {...customProps}
      label={props.label + ` (${props?.format})`}
    />
  );
};

export default UIProFormDatePicker;
