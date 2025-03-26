import { request } from "@umijs/max";

const resrouce = '/v1/login'

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<{
    data: {
      token: {
        type: string
        token: string
        expired_at: string
        status?: string
      }
    }
  }>(resrouce, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
