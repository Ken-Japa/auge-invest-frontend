import { User, UserSettings } from './user'

/**
 * @interface ApiResponse
 * @template T O tipo dos dados retornados pela API.
 * @property {boolean} success - Indica se a requisição foi bem-sucedida.
 * @property {T} [data] - Os dados retornados pela API em caso de sucesso.
 * @property {object} [error] - O objeto de erro retornado pela API em caso de falha.
 * @property {string} error.code - O código do erro.
 * @property {string} error.message - A mensagem de erro.
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

/**
 * @interface UserRegistrationData
 * @property {string} name - O nome do usuário.
 * @property {string} email - O email do usuário.
 * @property {string} [phone] - O telefone do usuário (opcional).
 * @property {string} cpf - O CPF do usuário.
 * @property {string} password - A senha do usuário.
 */
export interface UserRegistrationData {
  name: string
  email: string
  phone?: string
  cpf: string
  password: string
}

/**
 * @interface UserLoginData
 * @property {string} email - O email do usuário para login.
 * @property {string} password - A senha do usuário para login.
 */
export interface UserLoginData {
  email: string
  password: string
}

// Define UserPreferences type based on the User interface
/**
 * @typedef {User['preferences']} UserPreferences - As preferências do usuário, baseadas na interface User.
 */
type UserPreferences = User['preferences']

/**
 * @typedef {Partial<Omit<UserRegistrationData, 'password'>> & { settings?: Partial<UserSettings>, preferences?: Partial<UserPreferences> }} UserUpdateData - Dados para atualização de usuário, permitindo atualização parcial de dados de registro (exceto senha), configurações e preferências.
 */
export type UserUpdateData = Partial<Omit<UserRegistrationData, 'password'>> & {
  settings?: Partial<UserSettings>
  preferences?: Partial<UserPreferences>
}
