import { fetchDishes } from '@/services/dishes.service';
import { Avatar, Input, List } from 'antd';
import React from 'react';
import { useRequest } from 'umi';



const Dishes = () => {@
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data, loading } = useRequest(() => fetchDishes(searchTerm));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Input placeholder="Tìm kiếm món ăn" onChange={handleSearch} />
      <List
        loading={loading}
        dataSource={data?.dishes}
        pagination={{
          pageSize: 10,
          total: data?.total,
          onChange: (page) => {
            // Handle pagination
          },
        }}
        renderItem={(item) => (
          <>
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={<a href="#">{item.title}</a>} description={item.description} />
            <List.Item>
              {item.name} {/* Display dish name */}
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default Dishes;
