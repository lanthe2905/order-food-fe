import { FooterToolbar } from '@ant-design/pro-components';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Button, Input, Modal, Select, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Option } = Select;

// Ký hiệu chấm công
const ATTENDANCE_SYMBOLS = [
  { key: '+', label: 'Có mặt', color: 'blue' },
  { key: '-', label: 'Nghỉ không phép', color: 'red' },
  { key: 'N', label: 'Nghỉ phép', color: 'purple' },
  { key: 'Đ', label: 'Đi muộn', color: 'orange' },
  { key: 'CT', label: 'Công tác', color: 'green' },
  { key: 'TS', label: 'Thai sản', color: 'pink' },
  { key: 'BV', label: 'Bệnh viện', color: 'magenta' },
  { key: 'Coo', label: 'Công cộng', color: 'cyan' },
  { key: 'TN', label: 'Tăng ca', color: 'gold' },
  { key: 'CB', label: 'Cá biệt', color: 'lime' },
  { key: 'Tr', label: 'Trực', color: 'volcano' },
  { key: 'Cr', label: 'Chưa rõ', color: 'grey' },
  { key: 'L', label: 'Làm nửa ngày', color: 'geekblue' },
  { key: 'H0.5', label: 'Nửa ngày', color: 'blue' },
  { key: 'TKH', label: 'Tạm khóa', color: 'black' },
];

const employees = [
  { id: '6000', title: 'Lê Xuân Linh' },
  { id: '6001', title: 'Nguyễn Toàn Quyền' },
];

const Timekeeping = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState<any[]>([]);
  const [modal, setModal] = useState({ visible: false, resourceId: '', dateStr: '' });

  // Tạo resource cho từng nhân viên
  const resources = employees.map((emp) => ({
    id: emp.id,
    title: emp.title,
  }));

  // Tạo các ngày trong tháng
  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf('month').format('YYYY-MM-DD');
  const endOfMonth = currentDate.endOf('month').format('YYYY-MM-DD');

  // Xử lý click vào cell
  const handleDateClick = (info: any) => {
    setModal({ visible: true, resourceId: info.resource.id, dateStr: info.dateStr });
  };

  // Chọn ký hiệu chấm công
  const handleSelectSymbol = (symbol: string) => {
    setEvents((prev) => [
      ...prev.filter((ev) => !(ev.resourceId === modal.resourceId && dayjs(ev.start).isSame(modal.dateStr, 'day'))),
      {
        id: `${modal.resourceId}-${modal.dateStr}`,
        resourceId: modal.resourceId,
        start: modal.dateStr,
        end: modal.dateStr,
        title: symbol,
        color: ATTENDANCE_SYMBOLS.find((s) => s.key === symbol)?.color,
        allDay: true,
      },
    ]);
    setModal({ ...modal, visible: false });
  };

  return (
    <div>
      {/* Header */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="SDB/Họ tên" style={{ width: 200 }} />
        <Button type="primary">Tạo bảng công</Button>
      </Space>

      {/* FullCalendar */}
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        headerToolbar={false}
        height="auto"
        resources={resources}
        resourceAreaColumns={[
          {
            field: 'title',
            headerContent: 'Nhân viên',
          },
        ]}
        events={events}
        initialDate={startOfMonth}
        slotLabelFormat={[{ day: '2-digit' }]}
        eventContent={renderEventContent}
        selectable
        selectMirror
        select={handleDateClick}
        slotLabelInterval={{ days: 1 }}
        visibleRange={{
          start: startOfMonth,
          end: endOfMonth,
        }}
      />

      {/* Modal chọn ký hiệu */}
      <Modal open={modal.visible} onCancel={() => setModal({ ...modal, visible: false })} footer={null} title="Chọn ký hiệu chấm công">
        <Space wrap>
          {ATTENDANCE_SYMBOLS.map((sym) => (
            <Tag
              key={sym.key}
              color={sym.color}
              style={{ cursor: 'pointer', fontSize: 16, padding: '8px 16px' }}
              onClick={() => handleSelectSymbol(sym.key)}
            >
              {sym.key}
            </Tag>
          ))}
        </Space>
      </Modal>

      {/* Footer ký hiệu */}
      <FooterToolbar>
        <Space>
          {ATTENDANCE_SYMBOLS.map((sym) => (
            <Tag key={sym.key} color={sym.color}>
              {sym.key}
            </Tag>
          ))}
        </Space>
      </FooterToolbar>
    </div>
  );
};

// Hiển thị ký hiệu trong cell
function renderEventContent(eventInfo: any) {
  return (
    <Tag color={eventInfo.event.backgroundColor || 'default'} style={{ fontSize: 16 }}>
      {eventInfo.event.title}
    </Tag>
  );
}

export default Timekeeping;
