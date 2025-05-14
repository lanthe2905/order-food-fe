import { Button, Space, Tag, Progress } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { Warehouse } from '@/mock/warehouse';

interface UseWarehouseColumnsProps {
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  onSelect: (warehouse: Warehouse) => void;
}

const useWarehouseColumns = ({ onEdit, onDelete, onSelect }: UseWarehouseColumnsProps): ProColumns<Warehouse>[] => {
  return [
    {
      title: 'Mã kho',
      dataIndex: 'code',
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Tên kho',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      ellipsis: true,
    },
    {
      title: 'Sức chứa',
      dataIndex: 'capacity',
      render: (_, record) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>{record.currentUsage}/{record.capacity}</span>
          <Progress
            percent={Math.round((record.currentUsage / record.capacity) * 100)}
            status={record.currentUsage > record.capacity * 0.9 ? 'exception' : 'active'}
          />
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'success' : 'error'}>
          {record.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onSelect(record)}>
            Xem chi tiết
          </Button>
          <Button type="link" onClick={() => onEdit(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => onDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
};

export default useWarehouseColumns;
