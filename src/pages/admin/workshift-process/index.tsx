import { PageContainer, ProFormDatePicker, QueryFilter } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Card, Steps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import InitialEmployee from './components/initialEmployee';
import InitialWorkshiftProcess from './components/initialWorkshiftProcess';
import Timekeeping from './components/Timekeeping';
import { WorkshiftProcessContext } from './context';

const WorkShiftProcess = () => {
  const [current, setCurrent] = useState(0);
  const [thang, setThang] = useState<dayjs.Dayjs | null>(null);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <WorkshiftProcessContext.Provider value={{ thang }}>
      <PageContainer key={'pages.workshift-process.title'} title={<FormattedMessage id="pages.workshift-process.title" />}>
        <QueryFilter
          labelWidth={'auto'}
          style={{
            background: '#fff',
            marginBottom: '24px',
          }}
          onFinish={async (values) => {
            if (values.month) {
              setThang(dayjs(values.month));
            }
          }}
        >
          <ProFormDatePicker.Month
            name="month"
            label={'Tháng'}
            fieldProps={{
              format: 'MM/YYYY',
              style: {
                width: '100%',
              },
            }}
            allowClear={false}
            rules={[{ required: true, message: 'Vui lòng chọn tháng' }]}
            placeholder="Tháng dữ liệu"
          />
        </QueryFilter>

        <Card>
          <Steps
            current={current}
            onChange={onChange}
            items={[
              {
                title: 'Khởi tạo chấm công',
              },
              {
                title: 'Khởi tạo nhân sự',
              },
              {
                title: 'Chấm công',
              },
              {
                title: 'Tính lương',
                description: 'Chốt chấm công',
              },
            ]}
          />
          {/* Content */}
          <div style={{ marginTop: 24 }}>
            {current === 0 && <InitialWorkshiftProcess />}
            {current === 1 && <InitialEmployee />}
            {current === 2 && <Timekeeping />}
            {current === 3 && <div>Chốt chấm công</div>}
          </div>
        </Card>
      </PageContainer>
    </WorkshiftProcessContext.Provider>
  );
};

export default WorkShiftProcess;
