import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import useStyle from './style.style';

interface PriceInputProps {
  id?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const UploadImage = (props: PriceInputProps) => {
  const { id, value = {}, onChange } = props;
  const fileInputRef = useRef<InputRef>(null);
  const [fileList, setFileList] = useState();

  const { styles } = useStyle();

  const handleChange = (e: any) => {
    setFileList(fileInputRef.current?.input?.files);
  };

  return (
    <>
      <div
        className={styles.uploadImage}
        id={'upload-image-container'}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === document.getElementById('upload-image-container')) {
            fileInputRef.current?.input?.click();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="lucide lucide-camera mx-auto h-12 w-12 text-gray-400"
          data-lov-id="src/components/recipe/ImageUpload.tsx:14:10"
          data-lov-name="Camera"
          data-component-line="14"
          data-component-name="Camera"
          data-component-content="%7B%22className%22%3A%22mx-auto%20h-12%20w-12%20text-gray-400%22%7D"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
        <p>Nhấn để tải lên hình ảnh món ăn</p>

        {fileList?.length > 0 ? (
          <Image
            preview={{
              mask: (
                <div className={styles.mask}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <DeleteOutlined />
                  </button>

                  <button type="button" onClick={(e) => {}}>
                    <EyeOutlined />
                  </button>
                </div>
              ),
            }}
            height={'100%'}
            width={'100%'}
            id="preview-image"
            className={styles.previewImage}
            src={URL?.createObjectURL(fileList[0])}
          />
        ) : null}
        <Input ref={fileInputRef} id="upload-image" type="file" style={{ display: 'none' }} onChange={handleChange} />
      </div>
    </>
  );
};

export default UploadImage;
