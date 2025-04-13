import React from 'react'
import { Pagination, Flex } from 'antd'

type PaginationProps = {
  children?: React.ReactNode
  filters: [form: any, setForm: any]
  totalSource: number
  total?: number
}
/**
 * 
 * @description showSizeChanger chỉ hiện khi total > 50 
 * 
 */
export const Paginate = ({ children, filters, total, totalSource }: PaginationProps) => {
  const [form, setForm] = filters
  const onChange = (current: number, pageSize: number) => {
    setForm({ type: 'PAGE', payload: { ...form, pageSize: pageSize, current: current } })
  }

  return (
    <>
      <Flex gap="middle" justify='end'>
        <div>
          Tìm thấy {(totalSource) ?? 0} trên <b>{total ?? 0}</b> kết quả
        </div>
        <Pagination current={form.current} defaultCurrent={1} total={total} onChange={onChange} pageSize={form.pageSize}></Pagination>
      </Flex>
    </>
  )
}