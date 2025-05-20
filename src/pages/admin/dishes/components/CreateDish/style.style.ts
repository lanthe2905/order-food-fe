import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  title: {
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      color: token.colorPrimary,
      lineHeight: 1,
    },
    fontWeight: 800,
  },
  uploadImage: {
    width: '100%',
    height: '200px',
    border: '1px solid',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgb(209 213 219 / 1)',
    // flex
    display: 'flex',
    flexFlow: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    cursor: 'pointer',
    '& svg': {
      fontWeight: 800,
      width: '48px',
    },
    '&:hover': {
      color: token.colorPrimary,
      lineHeight: 1,
      transition: 'all 0.15s ease',
      borderColor: token.colorPrimary,
      backgroundColor: 'rgba(220,220,220,0.1)',
    },
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mask: {
    // Icon button trong lớp mask
    '& button': {
      fontSize: 20,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      '&:hover': {
        color: `color-mix(in srgb, ${token.colorPrimary} 60%, white 30%)`,
      },
    },
  },
}));

export default useStyle;
