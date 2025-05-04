import { Button, Result } from 'antd'
import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  prevPath: string
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      prevPath: window.location.pathname
    }
  }

  // 当发生错误时，state 中的 hasError 变成 true
  static getDerivedStateFromError() {
    return { hasError: true, prevPath: window.location.pathname, }
  }

  componentDidUpdate(prevProps: any) {
    // Reset trạng thái lỗi khi route thay đổi
    if (this.state.prevPath !== window.location.pathname) {
      this.setState({ hasError: false, prevPath: window.location.pathname });
    }
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    return hasError ? <Result
      status="500"
      subTitle={'Có lỗi xảy ra trên hệ thống! '}
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Reload lại trang
        </Button>
      }
    /> : children
  }
}