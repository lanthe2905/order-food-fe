import { ActionType, ProTable as AntProTable, ParamsType, ProTableProps } from '@ant-design/pro-components'
import React, { useRef, useState } from 'react'

const ProTable = <Type extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = "text">(
  props: ProTableProps<Type, Params>
): React.ReactNode => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  // @ts-ignore
  const actionRef = useRef<ActionType>(props?.actionRef ? props.actionRef : undefined)

  const columnsCustom = props.columns?.map(column => {
    return {
      ellipsis: true,
      width: 100,
      ...column
    }
  })

  return (
    <AntProTable<Type>
      rowKey={props.rowKey as keyof Type}
      search={{
        // Căn label không bị đè lên input
        labelWidth: 'auto',
        defaultCollapsed: true,
        ...props.search,
      }}
      scroll={{
        x: 'max-content',
      }}
      // sticky={{ offsetHeader: 0 }}
      postData={(data: any) => {
        if (data.length == 0 && currentPage > 1) {
          const current = currentPage
          const backPage = current - 1
          setCurrentPage(backPage <= 0 ? current : backPage)
          actionRef.current?.reload()
        }
        return data
      }}
      onChange={(pagi) => {
        setCurrentPage(pagi.current as number)
      }}
      beforeSearchSubmit={(params: any) => {
        setCurrentPage(1)
        return params
      }}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onShowSizeChange(current, size) {
          setPageSize(size as any)
        },
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 50, 100], // Các lựa chọn số dòng
        showTotal(total, range) {
          return (
            <React.Fragment>
              {range.join('-')} trên {total} kết quả{' '}
            </React.Fragment>
          )
        },
      }}
      {...props}
      columns={columnsCustom}
    />
  )
}

export default ProTable