import ProTable from '@/components/Table';
import UIBtnDelete from '@/components/ui/Button/BtnDelete';
import { handleApiError } from '@/utils/handleError';
import { SplitCellsOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import { Flex, message } from 'antd';
import Create from './Create';
import { deleteEmployee, getEmployeeList } from './service';
import useStyle from './style.style';
import { Employee } from './typing';
import UpdateEmployee from './Update';
import { useRef } from 'react';

const ListEmployee = () => {
  const { styles } = useStyle();
  const actionRef = useRef<ActionType>()
  const columns: ProColumnType<Employee>[] = [
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      key: 'full_name',
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
      key: 'phone_number',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'CCCD/CMND',
      key: 'cccd',
      dataIndex: 'cccd',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Giới tính',
      key: 'sex',
      dataIndex: 'sex',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Nơi thường trú',
      dataIndex: 'place_origin',
      key: 'place_origin',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Nơi cư trú',
      dataIndex: 'place_of_residence',
      key: 'place_of_residence',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Quốc tịch',
      dataIndex: 'nationality',
      key: 'nationality',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Thao tác',
      search: false,
      render: (dom, record) => {
        return (
          <>
            <UpdateEmployee record={record} reloadTable={reloadTable} />
            <UIBtnDelete
              onConfirm={async (e) => {
                try {
                  await deleteEmployee(record.id);
                  message.success('Xoá nhân viên thành công');
                  reloadTable();
                } catch (error) {
                  handleApiError(error, null);
                }
              }}
            />
          </>
        );
      },
    },
  ];

  const reloadTable = () => actionRef.current?.reload()

  return (
    <ProTable<Employee>
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      toolBarRender={() => [<Create key={'create'} reloadTable={reloadTable} />]}
      request={async (params) => {
        const data = await getEmployeeList(params);
        return {
          data: data.data ?? [],
          total: data?.meta?.total,
        };
      }}
    />
  );
};

export default ListEmployee;
