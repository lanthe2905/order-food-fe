import { Col, Flex, Row, Spin } from "antd";
import React from "react";


const LoadingUI = (props: React.PropsWithChildren<{ loading: boolean }>) => {

  if (props.loading) {
    return (
      <Flex justify={'center'} align={'middle'}>
        <Spin />
      </Flex>)
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default LoadingUI