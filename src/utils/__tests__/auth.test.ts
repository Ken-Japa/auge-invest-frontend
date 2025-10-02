import { clearAuthData, getAuthToken, getUserId, setAuthData } from '../auth'

describe('Auth Utils', () => {
  let cookieDescriptor: PropertyDescriptor | undefined
  let mockCookies: Record<string, string | undefined>

  beforeAll(() => {
    cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie')
    mockCookies = {}

    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: jest.fn(() => {
        return Object.entries(mockCookies)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ')
      }),
      set: jest.fn((value) => {
        const parts = value.split('; ')
        const [name, val] = parts[0].split('=')
        const expiresPart = parts.find((p: string) => p.startsWith('expires='))

        if (expiresPart) {
          const expiresDate = new Date(expiresPart.split('=')[1])
          if (expiresDate < new Date()) {
            delete mockCookies[name]
          } else {
            mockCookies[name] = val
          }
        } else {
          mockCookies[name] = val
        }
      }),
    })
  })

  afterAll(() => {
    if (cookieDescriptor) {
      Object.defineProperty(document, 'cookie', cookieDescriptor)
    }
  })

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    mockCookies = {} // Reset mockCookies for each test
    ;(Object.getOwnPropertyDescriptor(document, 'cookie')?.set as jest.Mock).mockClear()
  })

  describe('getAuthToken', () => {
    it('should return token from localStorage if available, even if cookies are empty', () => {
      localStorage.setItem('authToken', 'local-token-123')
      expect(getAuthToken()).toBe('local-token-123')
      expect(localStorage.getItem('authToken')).toBe('local-token-123')
      expect(document.cookie).toBe('')
    })

    it('should return token from authToken cookie if localStorage is empty', () => {
      mockCookies['authToken'] = 'cookie-token-456'
      expect(getAuthToken()).toBe('cookie-token-456')
      expect(localStorage.getItem('authToken')).toBeNull()
      expect(mockCookies['authToken']).toBe('cookie-token-456')
    })

    it('should return token from clientAuthToken cookie if authToken cookie and localStorage are empty', () => {
      mockCookies['clientAuthToken'] = 'client-cookie-token-789'
      expect(getAuthToken()).toBe('client-cookie-token-789')
      expect(localStorage.getItem('authToken')).toBeNull()
      expect(mockCookies['clientAuthToken']).toBe('client-cookie-token-789')
    })

    it('should generate and store google_ prefixed token if userId is present in localStorage and not an email', () => {
      localStorage.setItem('userId', '12345')
      expect(getAuthToken()).toBe('google_12345')
      expect(localStorage.getItem('authToken')).toBe('google_12345')
    })

    it('should generate and store google_ prefixed token if userId is present in cookies and not an email', () => {
      mockCookies['userId'] = '67890'
      expect(getAuthToken()).toBe('google_67890')
      expect(localStorage.getItem('authToken')).toBe('google_67890')
    })

    it('should return null if no token or valid userId is present anywhere', () => {
      expect(getAuthToken()).toBeNull()
    })
    it('should return token from cookie if available', () => {
      mockCookies['authToken'] = 'cookie-token'
      expect(getAuthToken()).toBe('cookie-token')
    })

    it('should return null if no token is found', () => {
      expect(getAuthToken()).toBeNull()
    })
  })

  describe('setAuthData', () => {
    it('should set authToken and userId in localStorage and cookie if provided', () => {
      setAuthData('test-token', '123')
      expect(localStorage.getItem('authToken')).toBe('test-token')
      expect(localStorage.getItem('userId')).toBe('123')
      expect(mockCookies['authToken']).toBe('test-token')
      expect(mockCookies['userId']).toBe('123')
    })

    it('should not set data if token is empty', () => {
      setAuthData('', '123')
      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('userId')).toBeNull()
      expect(mockCookies['authToken']).toBeUndefined()
      expect(mockCookies['userId']).toBeUndefined()
    })
  })

  describe('clearAuthData', () => {
    it('should remove authToken and userId from localStorage and cookies', () => {
      localStorage.setItem('authToken', 'test-token')
      localStorage.setItem('userId', '123')
      mockCookies['authToken'] = 'test-token'
      mockCookies['userId'] = '123'

      clearAuthData()

      expect(localStorage.getItem('authToken')).toBeNull()
      expect(localStorage.getItem('userId')).toBeNull()
      expect(mockCookies['authToken']).toBeUndefined()
      expect(mockCookies['userId']).toBeUndefined()
    })
  })

  describe('getUserId', () => {
    const mockSession = { user: { id: 'session-user-id', email: 'session-user-email' } }

    it('should return userId from localStorage if available', () => {
      localStorage.setItem('userId', 'local-user')
      expect(getUserId(mockSession)).toBe('local-user')
    })

    it('should return userId from cookie if available', () => {
      mockCookies['userId'] = 'cookie-user'
      expect(getUserId(mockSession)).toBe('cookie-user')
    })

    it('should return userId from session if available', () => {
      expect(getUserId(mockSession)).toBe('session-user-id')
    })

    it('should return userId from session email if id is not available', () => {
      const sessionWithoutId = { user: { email: 'session-user-email' } }
      expect(getUserId(sessionWithoutId)).toBe('session-user-email')
    })

    it('should return null if no userId is found', () => {
      expect(getUserId(null)).toBeNull()
    })
  })
})
