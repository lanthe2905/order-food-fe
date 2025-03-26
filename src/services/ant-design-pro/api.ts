// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function fetchCurrentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.Rule<API.CurrentUser | undefined>;
  }>('/v1/current-user', {
    method: 'GET',
    ...(options || {}),
  });
}
