import { Button, Modal, Result } from "antd";

const InitialWorkshiftProcess = () => {
  return (
    <div>
      <Result
        status="success"
        title="KHỞI TẠO CHẤM CÔNG THÁNG []!"
        extra={[
          <Button type="primary" key="console"
            onClick={(() => {
              Modal.confirm({
                title: "Xác nhận khởi tạo",
                content: "Bạn có chắc chắn muốn khởi tạo chấm công tháng này không?",
                maskClosable: true,
              })
            })}
          >
            Khởi tạo
          </Button>,
        ]}
      />
    </div>
  );
};

export default InitialWorkshiftProcess;
