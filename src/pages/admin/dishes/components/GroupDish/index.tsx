import { ProTable } from '@/components/ui/table';
import { ProColumns } from '@ant-design/pro-components';

const GroupDish = () => {
  const columns: ProColumns<any>[] = [
    {
      title: 'Tên Nhóm Món Ăn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao Tác',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={[]}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default GroupDish;
