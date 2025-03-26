const TOKEN_NAME = 'access_token'

export const setToken = (token: string | null) => {
  // cookies.set(TOKEN_NAME, token)
  localStorage.setItem(TOKEN_NAME, token as string)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}