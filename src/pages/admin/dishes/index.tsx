import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';

import DishList from './components/DishList';
import GroupDish from './components/GroupDish';

const Dishes = () => {
  const [tab, setTab] = useState<string>('1');

  return (
    <PageContainer
      title="Quản lý món ăn"
      tabList={[
        {
          tab: 'Danh sách món ăn',
          key: '1',
        },
        {
          tab: 'Nhóm món ăn',
          key: '2',
        },
      ]}
      onTabChange={(key) => setTab(key)}
    >
      {tab === '1' && <DishList />}
      {tab === '2' && <GroupDish />}
    </PageContainer>
  );
};

export default Dishes;
