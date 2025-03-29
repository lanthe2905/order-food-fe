import { request } from '@umijs/max';
import { Employee } from './typing';

const API_URL = '/v1/employee';

export const userList = async (params: any) => {
  return await request<API.RuleList<Employee>>(API_URL, { params });
};
