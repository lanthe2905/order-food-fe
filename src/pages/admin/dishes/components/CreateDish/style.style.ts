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
    // backgroundColor: 'red',
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
    '&:hover': {
      color: token.colorPrimary,
      lineHeight: 1,
      transition: 'all 0.15s ease',
      borderColor: token.colorPrimary,
      backgroundColor: 'rgba(220,220,220,0.1)',
    },
  },
}));

export default useStyle;
