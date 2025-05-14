import type { Dish } from '@/models/dish.model';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import DishList from './components/DishList';

const DishPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentDish, setCurrentDish] = useState<Dish | null>(null);

  // Mock data for testing
  const mockDishes: Dish[] = [
    {
      id: 1,
      code: 'M001',
      name: 'Phở bò',
      category: 'Món chính',
      price: 45000,
      status: 'active',
      ingredients: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      code: 'M002',
      name: 'Cơm sườn',
      category: 'Món chính',
      price: 35000,
      status: 'active',
      ingredients: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const handleEditDish = (dish: Dish) => {
    setCurrentDish(dish);
    setIsFormVisible(true);
  };

  const handleDeleteDish = (dish: Dish) => {
    message.success('Xóa món ăn thành công');
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <DishList
        actionRef={actionRef}
        dishes={mockDishes}
        onEdit={handleEditDish}
        onDelete={handleDeleteDish}
        onAdd={() => {
          setCurrentDish(null);
          setIsFormVisible(true);
        }}
      />
    </PageContainer>
  );
};

export default DishPage;
