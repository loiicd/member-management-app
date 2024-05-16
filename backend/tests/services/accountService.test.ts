// import { AccountService } from '../../src/services/accountService'
// import { AccountEntityService } from '../../src/database/accountEntityService'
// import { UserEntityService } from '../../src/database/userEntityService'
// import { UserAccountRelEntityService } from '../../src/database/userAccountRelEntityService'

// jest.mock('../../src/database/accountEntityService')
// jest.mock('../../src/database/userEntityService')
// jest.mock('../../src/database/userAccountRelEntityService')

// describe('AccountService', () => {
//   let accountService: AccountService

//   beforeEach(() => {
//     accountService = new AccountService
//   })

//   describe('getOneById', () => {
//     it('should call selectAccount with the correct parameters', async () => {
//       const mockAccountId = '123'
//       const mockAccount = { id: '123', organisation_name: 'Example Organisation' }
//       const mockClient = {}

//       const MockAccountEntityService = AccountEntityService as jest.MockedClass<typeof AccountEntityService>
//       MockAccountEntityService.prototype.selectAccount.mockResolvedValueOnce(mockAccount)

//       const result = await accountService.getOneById(mockAccountId)

//       expect(result).toEqual(mockAccount)
//       expect(AccountEntityService).toHaveBeenCalled()
//       expect(MockAccountEntityService.prototype.selectAccount).toHaveBeenCalledWith(mockClient, mockAccountId);
//     })
//   })
// })