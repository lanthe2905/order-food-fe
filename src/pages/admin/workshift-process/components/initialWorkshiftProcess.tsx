import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useContext } from 'react';
import { WorkshiftProcessContext } from '../context';

const InitialWorkshiftProcess = () => {
  const { thang } = useContext(WorkshiftProcessContext);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
    },
    {
      title: 'Ca làm việc',
      dataIndex: 'shift',
    },
    {
      title: 'Thao tác',
      render: () => (
        <Button type="primary" size="small">
          Thêm ca
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

export default InitialWorkshiftProcess;
