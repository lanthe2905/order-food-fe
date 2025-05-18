import { ProTable } from '@/components/ui/table';
import { PageContainer, ProColumnType, ProFormDatePicker } from '@ant-design/pro-components';

const SalaryInfo = () => {
  const columns: ProColumnType<any>[] = [
    // filter
    {
      title: 'Tháng dữ liệu',
      dataIndex: 'month',
      hideInTable: true,
      hideInSetting: true,
      renderFormItem(dom, entity) {
        return (
          <ProFormDatePicker.Month
            fieldProps={{
              format: 'MM/YYYY',
              style: {
                width: '100%',
              },
            }}
            rules={[{ required: true, message: 'Vui lòng chọn tháng' }]}
            placeholder="Tháng dữ liệu"
          />
        );
      },
    },
    {
      title: 'Tên nhân viên',
      dataIndex: '1',
    },
    {
      title: 'Lương cơ bản',
      dataIndex: '1',
    },
    {
      title: 'Thưởng',
      dataIndex: '2',
    },
    {
      title: 'Bảo hiểm',
      dataIndex: '3',
    },
    {
      title: 'Trợ cấp',
      dataIndex: '3',
    },
    {
      title: 'Khấu trừ',
      dataIndex: '4',
    },
  ];

  return (
    <PageContainer>
      <ProTable columns={columns} />
    </PageContainer>
  );
};

export default SalaryInfo;
