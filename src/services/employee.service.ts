import { request } from 'umi';
import type { Employee, EmployeeListResponse, EmployeeResponse, EmployeeOption } from '@/models/employee.model';

const resource = 'api/v1/employees';

export const fetchEmployeeList = async (params?: any): Promise<EmployeeListResponse> => {
  return request(`${resource}`, {
    method: 'GET',
    params,
  });
};

export const fetchEmployeeById = async (id: number): Promise<EmployeeResponse> => {
  return request(`${resource}/${id}`, {
    method: 'GET',
  });
};

export const createEmployee = async (data: Partial<Employee>): Promise<EmployeeResponse> => {
  return request(`${resource}`, {
    method: 'POST',
    data,
  });
};

export const updateEmployee = async (id: number, data: Partial<Employee>): Promise<EmployeeResponse> => {
  return request(`${resource}/${id}`, {
    method: 'PUT',
    data,
  });
};

export const deleteEmployee = async (id: number): Promise<void> => {
  return request(`${resource}/${id}`, {
    method: 'DELETE',
  });
};

export const fetchEmployeeOptions = async (): Promise<EmployeeOption[]> => {
  const response = await request(`${resource}/options`, {
    method: 'GET',
  });
  return response.data;
};
