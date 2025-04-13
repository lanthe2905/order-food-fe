import { ProFormSelect } from '@ant-design/pro-form';
import type { SelectProps } from 'antd'
import type { ProFormSelectProps } from '@ant-design/pro-form/es/components/Select/index.d'
import { getMessage } from '@/util/common';


const UISelectOption = (props: ProFormSelectProps<SelectProps>) => {
  return (
    <ProFormSelect
      {...props}
      mode={props.mode ?? 'single'}
      rules={[
        {
          required: props.required,
          message: getMessage('required', props.label),
        },
        ...(props?.rules ?? [])
      ]}
      fieldProps={{
        style: {
          width: '100%',
        },
        ...props.fieldProps,
      }}
      showSearch={true}
    />
  )
}

export default UISelectOption