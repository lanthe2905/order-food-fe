import UIProFormDatePicker from '@/components/ui/date/ProDatePicker';
import { handleApiError } from '@/utils/handleError';
import { EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { GIOI_TINH_ENUMS } from './constant';
import { updateEmployee } from './service';
import { Employee } from './typing';
import { useModalForm } from '@/hooks/useModal';

type Props = {
  reloadTable: () => void;
  record: Employee;
};

const UpdateEmployee = ({ reloadTable, record }: Props) => {
  const [form] = Form.useForm();
  const {initialValue: employee, setVisible} = useModalForm({
    form: form,
    initialValue: record
  })
  const onFinish = async (values: any) => {
    try {
      await updateEmployee({
        id: record.id,
        ...values,
      });
      message.success('Cập nhật nhân viên thành công!');
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
      trigger={
        <Button type="link" icon={<EditOutlined />}>
          Chỉnh sửa
        </Button>
      }
      onOpenChange={setVisible}
      initialValues={employee}
    >
      <ProFormGroup>
        <ProFormText label={'Họ và tên'} name={'full_name'} />
        <ProFormText
          name={'phone_number'}
          label={'Số điện thoại'}
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
        <ProFormText name={'place_origin'} label={'Nơi thường trú'} />
        <ProFormText name={'place_of_residence'} label={'Nơi cư trú'} />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText name={'nationality'} label={'Quốc tịch'} initialValue={'Việt Nam'} />
        <ProFormText name={'username'} label={'Tên tài khoản'} />
      </ProFormGroup>
    </ModalForm>
  );
};

export default UpdateEmployee;
