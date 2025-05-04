import { PlusOutlined } from '@ant-design/icons';
import { FormListActionType } from '@ant-design/pro-components';
import { Button, Card, Col, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const InitialEmployee = () => {


  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <React.Fragment>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const list = actionRef?.current?.getList();
            actionRef?.current?.add({
              name: 'New' + list?.length,
            });
          }}
        >
          Sao chép từ tháng trước
        </Button>
        <Button
          danger
          onClick={() => {
            actionRef?.current?.remove(1);
          }}
        >
          Xoá tất cả
        </Button>

        {/* <Button
          type="dashed"
          onClick={() => {
            const row = actionRef?.current?.get(1);
            console.log(row);
          }}
        >
          Get a row of data
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            const row = actionRef?.current?.getList();
            console.log(row);
          }}
        >
          get all data
        </Button> */}
      </Space>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="Danh sách nhân viên">
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.email}
                    />
                    <div>Content</div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Thêm nhân viên">
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef?.current?.move(1, 0);
              }}
            >
              Thêm nhân sự mới
            </Button>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InitialEmployee;
