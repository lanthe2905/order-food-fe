import { useEffect, useState } from 'react';
import useStyle from './style.style';

interface PriceInputProps {
  id?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const UploadImage = (props: PriceInputProps) => {
  const { id, value = {}, onChange } = props;

  const [fileList, setFileList] = useState();
  const { styles } = useStyle();

  useEffect(() => {
    if (value) {
      // setFileList(value);
    }
  }, [value]);

  return (
    <>
      <div className={styles.uploadImage} id={id}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
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
        <input type="file" style={{ display: 'none' }} onChange={onChange} value={fileList} />
      </div>
    </>
  );
};

export default UploadImage;
