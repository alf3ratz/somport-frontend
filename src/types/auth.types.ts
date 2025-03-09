export interface User {
  id?: string // Уникальный идентификатор
  username: string // Имя пользователя
  email?: string // Опциональный email
  role?: 'user' | 'admin' // Роль пользователя
  createdAt?: Date // Дата регистрации
}

export interface OAuthUrl {
  authorizationUrl: string
}

export interface OAuthCredential {
  state: string
  code: string
}
