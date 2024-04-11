import { AuthenticateService } from './authenticateService'
import { connect } from './db'

jest.mock('./db')

describe('AuthenticateService', () => {
  let authenticateService: AuthenticateService
  const connectMock = connect as jest.Mock
  const mockQuery = jest.fn()
  const mockClient = { query: mockQuery, end: jest.fn() }

  beforeEach(() => {
    authenticateService = new AuthenticateService()
    connectMock.mockResolvedValueOnce(mockClient)
  })

  describe('login', () => {
    it('should return Object with Error if user is not found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] })
      const email = 'test@example.com'
      const password = 'password123'
      const result = await authenticateService.login(email, password)
      expect(result).toEqual({ type: 'Error' })
    })

    it('should return PasswordMissed if user has now password', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: '1', email: 'test@example.com', password: null, passwordsalt: null }] })
      const email = 'test@example.com'
      const password = 'password123'
      const result = await authenticateService.login(email, password)
      expect(result).toEqual({ type: 'PasswordMissed', data: { userId: '1' } })
    })

    it('should return Success & Data if user found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: '1', email: 'admin@example.com', password: '$2a$10$DOyVPpgyw2zUxyPl4I4Kpu5Dg73QcaimXXhHFBjd15qxzc2WPOzYW', passwordsalt: '$2a$10$jR5kyQ2QHqtYYs2ZGD7bGO' }] })
      const email = 'admin@example.com'
      const password = 'Passwort'
      const result = await authenticateService.login(email, password)
      expect(result).toEqual({type: 'Success', data: { userId: '1', email: 'admin@example.com', token: expect.any(String) }})
    })
  })
})