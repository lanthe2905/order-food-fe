import { Modal } from 'antd'
import { constant } from '@/utils/constant'
import { waitTime } from '@/hooks/waiTime'
/*
 * @param {err}
 * @param formRef nếu dùng Form state của antd thì truyền vào để xử lý lỗi valdiate
 * @param navigate là state của react-router-dom để chuyển hướng trang
 */

const handleApiError = (err: any, formRef: any) => {
  switch (err?.code) {
    case 'INVALID_TOKEN':
      window.location.href = '/login'

      break

    case 'E_VALIDATION_ERROR':
      // Xử lý lỗi validate của antd
      err.messages.forEach((validation: any) => {
        const [prefixField, index, field, ...child] = validation.field.split('.')

        // Case xử lý dạng mãng
        if ((prefixField, index, field)) {
          formRef?.setFields([
            {
              name: [prefixField, Number(index), field, ...child],
              errors: [validation?.message],
            },
          ])

          formRef?.setFields([
            {
              name: [prefixField, index, field, ...child],
              errors: [validation?.message],
            },
          ])
        }
        // Case xử lý dạng {prefixField: {index: 'x'}}
        else if ((prefixField, index)) {
          // Nếu field có dạng prefixField.field/index
          formRef?.setFields([
            {
              name: [prefixField, index],
              errors: [validation?.message],
            },
          ])
        } else {
          // case dạng {field: ""}
          formRef?.setFields([
            {
              name: validation.field,
              errors: [validation?.message],
            },
          ])
        }
      })
      // message.error(constant.validation_error)
      Modal.error({ title: "Lỗi", content: constant.validation_error, okText: 'Đóng', cancelButtonProps: { hidden: true } })
      break
    case 'INTERNAL_SERVER_ERROR':
      // message.error(constant.server_error)
      Modal.error({ title: "Lỗi", content: constant.server_error, okText: 'Đóng', cancelButtonProps: { hidden: true } })
      break
    default:
      // message.error(err?.message)
      Modal.error({ title: "Lỗi", content: err?.message, okText: 'Đóng', cancelButtonProps: { hidden: true } })
      break
  }
}

// avatar : ant-form-item-explain-error
const controlTabError = async (params: { tabPaneKey?: string }) => {
  // class tab-with-errors define in global.less
  // class ant-tabs-tabpane default by antd class
  await waitTime(800)
  const tabPanes = document.querySelectorAll(params?.tabPaneKey ?? '.ant-tabs-tabpane')

  for (let i = 0; i < tabPanes.length; i++) {
    const tabPane = tabPanes[i]
    const foundError = tabPane.querySelector('.ant-form-item-explain-error')
    const tabId = tabPane.getAttribute('aria-labelledby')
    const tab = document.querySelector('#' + tabId)

    if (foundError) {
      tab?.classList.add('tab-with-errors')
    } else {
      tab?.classList.remove('tab-with-errors')
    }
  }
}


export { handleApiError, controlTabError }
