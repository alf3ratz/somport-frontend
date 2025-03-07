export interface User {
  id?: string // Уникальный идентификатор
  username: string // Имя пользователя
  email?: string // Опциональный email
  role?: 'user' | 'admin' // Роль пользователя
  createdAt?: Date // Дата регистрации
}
