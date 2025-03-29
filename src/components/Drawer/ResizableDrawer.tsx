import { useState } from "react";
import { Drawer, Button } from "antd";

import useStyles from "./style.style";
const defaultWidth = 400; 

const setting = {
  defaultWidth: defaultWidth,
  minWidth: 300, 
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ResizableDrawer = (props : Props) => {
  const [open, setOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [widthDrawer, setWidthDrawer] = useState(defaultWidth);
  const [width, setWidth] = useState(defaultWidth);
  const { styles } = useStyles();

  const handleMouseDown = (e) => {
    setIsResizing(true);
    document.body.classList.add("no-select"); // Thêm lớp CSS tắt chọn văn bản
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      setWidth((width) => Math.max(300, width + (e.movementX * -1))); // Giới hạn chiều rộng tối thiểu
    }
  };

  const handleMouseUp = (e) => {
    setWidthDrawer(width); // Cập nhật chiều rộng của Drawer
    setIsResizing(false);
    document.body.classList.remove("no-select"); // Gỡ lớp CSS khi kết thúc resize
  };

  return (
    <div
      onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
    >
      <Drawer
        title="Resizable Drawer"
        placement="right"
        onClose={() => setOpen(false)}
        open={props.open ? props.open : open}
        width={widthDrawer} // Chiều rộng động
        extra={
          <Button type="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p>Drawer Content</p>
      </Drawer>

      {/* Thanh kéo */}
      {
        open && (
          <div
            className={styles.dragResizeble}
            style={{
              right: width - 5,
            }}
            onMouseDown={handleMouseDown}
          />
        )
      }

    </div>
  );
};

export default ResizableDrawer;