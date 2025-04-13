import { Input, Typography } from 'antd'

type Props = {
  name?: string
  label?: string
  onChange?: Function
  onBlur?: Function
}

const { Paragraph } = Typography

const InputFilter = (props: Props) => {
  const registerEvent = []

  // Đăng ký xử lý sự kiện
  if ('onChange' in props) {
    registerEvent.push(props.onChange)
  } else if ('onBlur' in props) {
    registerEvent.push(props.onBlur)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Paragraph style={{ minWidth: '100px', marginBottom: '0px' }}>{props.label}:</Paragraph>
      <Input
        onBlur={(e) => {
          if (props?.onBlur) props?.onBlur(e)
        }}
        onKeyDown={(e) => {
          if (e.code == 'Enter') {
            e.currentTarget.blur()
          }
        }}
        style={{ margin: '0 0 0 5px' }}
        width={'30px'}
        name={'search'}
      ></Input>
    </div>
  )
}

export default InputFilter
