import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import useStyle from '../style.style';

interface PriceInputProps {
  id?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const UploadImage = (props: PriceInputProps) => {
  const { id, value = {}, onChange } = props;
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef<InputRef>(null);
  const [fileList, setFileList] = useState<File | null>(null);

  const { styles } = useStyle();

  const handleChange = () => {
    if (fileInputRef.current?.input?.files) {
      setFileList(fileInputRef.current?.input?.files[0]);
      setIsPreview(true);
    }
  };

  const handleRemove = () => {
    setFileList(null);
    setIsPreview(false);
  };

  return (
    <>
      <span
        className={styles.uploadImage}
        id={'upload-image-container'}
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.input?.click();
        }}
      >
        {isPreview ? (
          <Image
            preview={{
              mask: (
                <div className={styles.mask}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                  >
                    <DeleteOutlined />
                  </button>

                  <button type="button" onClick={() => {}}>
                    <EyeOutlined />
                  </button>
                </div>
              ),
            }}
            height={'100%'}
            width={'100%'}
            id="preview-image"
            className={styles.previewImage}
            src={fileList ? URL?.createObjectURL(fileList) : '#'}
          />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
            <p>Nhấn để tải lên hình ảnh món ăn</p>
            <Input ref={fileInputRef} id="upload-image" type="file" style={{ display: 'none' }} onChange={handleChange} />
          </>
        )}
      </span>
    </>
  );
};

export default UploadImage;
