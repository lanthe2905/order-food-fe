import { request } from '@umijs/max';
import { Employee } from './typing';

const API_URL = '/v1/employee';

export const getEmployeeList = async (params: any) => {
  return await request<API.RuleList<Employee>>(API_URL, { params });
};

export const createEmployee = async (data: Employee) => {
  return await request<API.RuleList<Employee>>(API_URL, { data, method: 'POST' });
};

export const updateEmployee = async (data: Employee) => {
  return await request<API.RuleList<Employee>>(`${API_URL}/${data.id}`, { data, method: 'PUT' });
};

export const deleteEmployee = async (id: number) => {
  return await request<API.RuleList<Employee>>(`${API_URL}/${id}`, { method: 'DELETE' });
};
