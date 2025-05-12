import UIProFormDatePicker from '@/components/ui/date/ProDatePicker';
import { handleApiError } from '@/utils/handleError';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { GIOI_TINH_ENUMS } from './constant';
import { createEmployee } from './service';

type Props = {
  reloadTable: () => void;
};

const CreateEmployee = ({ reloadTable }: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createEmployee(values);
      message.success('Tạo nhân viên thành công!');
      form.resetFields();
      reloadTable();
      return true;
    } catch (error) {
      console.log(error);
      handleApiError(error, form);
    }
  };

  return (
    <ModalForm
      title={'Thêm mới nhân viên'}
      onFinish={onFinish}
      form={form}
      colProps={{
        span: 12,
        xs: 12,
      }}
      trigger={
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm mới
        </Button>
      }
    >
      <ProFormGroup>
        <ProFormText label={'Họ và tên'} name={'full_name'} width={'md'} />
        <ProFormText
          name={'phone_number'}
          label={'Số điện thoại'}
          prefixCls='84'
          width={'md'}
          fieldProps={{
            onKeyPress: (e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            },
          }}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name={'cccd'}
          label={'Căn cước công dân'}
          width={'md'}
          fieldProps={{
            onKeyPress: (e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            },
          }}
        />

        <ProFormSelect
          name={'sex'}
          label={'Giới tính'}
          initialValue={GIOI_TINH_ENUMS.NAM}
          options={[
            {
              value: GIOI_TINH_ENUMS.NAM,
              label: 'Nam',
            },
            {
              value: GIOI_TINH_ENUMS.NU,
              label: 'Nữ',
            },
          ]}
        />

        <UIProFormDatePicker name={'date_of_birth'} label={'Ngày sinh'} format="DD/MM/YYYY" />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText name={'place_origin'} label={'Nơi thường trú'} width={'md'} />
        <ProFormText name={'place_of_residence'} label={'Nơi cư trú'} />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText name={'nationality'} label={'Quốc tịch'} initialValue={'Việt Nam'} width={'md'} />
        <ProFormText name={'username'} label={'Tên tài khoản'} />
      </ProFormGroup>
    </ModalForm>
  );
};

export default CreateEmployee;
