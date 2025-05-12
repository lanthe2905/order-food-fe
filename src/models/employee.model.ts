export interface Employee {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  status?: string;
}

export interface EmployeeOption {
  value: number;
  label: string;
}

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
}

export interface EmployeeResponse {
  data: Employee;
}
