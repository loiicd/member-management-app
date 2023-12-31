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
  })

  describe('login', () => {
    it('should return null if user is not found', async () => {
      connectMock.mockResolvedValueOnce(mockClient)
      mockQuery.mockResolvedValueOnce({ rows: [] })

      const email = 'test@example.com'
      const password = 'password123'

      const result = await authenticateService.login(email, password)

      expect(result).toBeNull()
    })

    
  })
})