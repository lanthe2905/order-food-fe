import { request } from "@umijs/max";

const resrouce = '/v1/login'

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(resrouce, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
