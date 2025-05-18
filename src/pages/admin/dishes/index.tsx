import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import DishList from './components/DishList';

const Dishes = () => {


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
    >
      <DishList />
    </PageContainer>
  );
};

export default Dishes;
