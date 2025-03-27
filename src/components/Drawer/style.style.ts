import { createStyles } from 'antd-style';


const useStyles = createStyles(({ token }) => {
    return {
        dragResizeble: {
            position: "fixed",
            top: 0,
            height: "100%",
            width: 5,
            cursor: "ew-resize",
            zIndex: 1050, // Phải cao hơn Drawer
            // borderLeft: `5px solid ${token.colorPrimary}`,
            boxShadow: `-5px 0 0 ${token.colorPrimary}`,
            opacity: 0.6,
        },
    }
});

export default useStyles;