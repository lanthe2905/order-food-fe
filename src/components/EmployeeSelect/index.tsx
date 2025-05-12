import React from 'react';
import { Select, Spin } from 'antd';
import { useEmployeeOptions } from '@/hooks/useEmployeeOptions';

interface EmployeeSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({
  value,
  onChange,
  placeholder = 'Select employee',
  disabled = false,
  style,
}) => {
  const { options, loading } = useEmployeeOptions();

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      loading={loading}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={options}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default EmployeeSelect;
