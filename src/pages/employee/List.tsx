import ProTable from '@/components/table';
import { SplitCellsOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ant-design/pro-components';
import { Flex } from 'antd';
import { userList } from './service';
import useStyle from './style.style';
import { Employee } from './typing';

export default () => {
  const {styles} = useStyle();
  
  const columns: ProColumnType<Employee>[] = [
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      fixed: 'left',
      ellipsis: true,
      width: 150,
      render(dom, entity, index, action, schema) {
        return (
          <Flex justify="space-between">
            <span>{entity.full_name}</span>
            <span>
              <SplitCellsOutlined className={styles.userSplitter} />
            </span>
          </Flex>
        );
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'CCCD/CMND',
      dataIndex: 'cccd',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Nơi thường trú',
      dataIndex: 'place_origin',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Nơi cư trú',
      dataIndex: 'place_of_residence',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Quốc tịch',
      dataIndex: 'nationality',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      ellipsis: true,
      width: 150,
    },
  ];

  return (
    <ProTable<Employee>
      rowKey="id"
      columns={columns}
      request={async (params) => {
        const data = await userList(params);
        return {
          data: data.data ?? [],
          total: data?.meta?.total,
        };
      }}
    />
  );
};
