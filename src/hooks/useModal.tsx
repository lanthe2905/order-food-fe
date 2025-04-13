import { useEffect, useState } from 'react'

import { Modal } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib'

interface UseConfirmationModalProps {
  title?: string
  content?: string
  okText?: string
  cancelText?: string
}

export const useModalConfirmWithSave = ({
  title = 'Thông báo',
  content = 'Thông tin đã được lưu thành công. Bạn có muốn đóng trang này?',
  okText = 'Đóng trang',
  cancelText = 'Tiếp tục',
}: UseConfirmationModalProps) => {
  const showModal = (onOk: () => void, onCancel?: () => void) => {
    Modal.confirm({
      title,
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      content,
      okText,
      cancelText,
      onOk,
      onCancel,
    })
  }

  return { showModal }
}

export const useModal = () => {
  const [open, setOpen] = useState(false)

  return {
    visible: open,
    setVisible: (visible: boolean) => setOpen(visible),
    closeModal: () => setOpen(false),
    openModal: () => setOpen(true),
  }
}

type TypeUseModalForm<T> = {
  initialValue: T // Sửa cú pháp ở đây
  form: FormInstance
}

export const useModalForm = <T,>(params: TypeUseModalForm<T>) => {
  const [open, setOpen] = useState(false)
  const [initialValue, setInitialValue] = useState(params.initialValue)

  useEffect(() => {
    if (open) setInitialValue(params.initialValue)
  }, [open])

  useEffect(() => {
    params.form.resetFields()
  }, [initialValue])

  return {
    visible: open,
    initialValue,
    setVisible: (visible: boolean) => setOpen(visible),
    closeModal: () => setOpen(false),
    openModal: () => setOpen(true),
  }
}
