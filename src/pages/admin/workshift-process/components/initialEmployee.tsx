import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useContext } from 'react';
import { WorkshiftProcessContext } from '../context';

const InitialEmployee = () => {
  const { thang } = useContext(WorkshiftProcessContext);

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
    },
    {
      title: 'Thao tác',
      render: () => (
        <Button type="primary" size="small">
          Thêm vào danh sách
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

export default InitialEmployee;
