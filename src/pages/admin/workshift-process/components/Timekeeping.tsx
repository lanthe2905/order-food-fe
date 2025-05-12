import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useContext } from 'react';
import { WorkshiftProcessContext } from '../context';

const Timekeeping = () => {
  const { thang } = useContext(WorkshiftProcessContext);

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
    },
    {
      title: 'Ca làm việc',
      dataIndex: 'shift',
    },
    {
      title: 'Giờ vào',
      dataIndex: 'check_in',
    },
    {
      title: 'Giờ ra',
      dataIndex: 'check_out',
    },
    {
      title: 'Thao tác',
      render: () => (
        <Button type="primary" size="small">
          Chấm công
        </Button>
      ),
    },
  ];

  return (
    <ProTable
      columns={columns}
      search={false}
      toolBarRender={false}
      pagination={false}
      dataSource={[]}
    />
  );
};

export default Timekeeping;
