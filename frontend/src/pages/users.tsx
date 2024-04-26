import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import { User } from '../types/user'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { UserApiClient } from '../services/userApiClient'
import { QualificationApiClient } from '../services/qualificationApiClient'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Qualification } from '../types/qualification'
import StandardLayout from '../layout/standard'
import PageHead from '../components/pageHead'
import UserTable from '../components/userTable'
import Input from '@mui/joy/Input'
import CreateUserDialog from '../components/createUserDialog'
import InviteUserDialog from '../components/inviteUserDialog'
import Dropdown from '@mui/joy/Dropdown'
import MenuButton from '@mui/joy/MenuButton'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import ListDivider from '@mui/joy/ListDivider'
import ListItemDecorator from '@mui/joy/ListItemDecorator'

const sortAttributes = ['firstname', 'lastname',  'birthdate', 'address', 'webaccess'] as const
export type SortAttribute = typeof sortAttributes[number]

const sortDirections = ['ASC', 'DESC'] as const
export type SortDirection = typeof sortDirections[number]

const urlParamKeys = ['sortAttribute', 'sortDirection', 'searchFilter', 'searchTerm', 'page'] as const
export type UrlParamKey = typeof urlParamKeys[number]

const UsersPage: FunctionComponent = () => {
  const { accountId } = useParams()
  const authParams = useAuthUser()()
  const authToken = useAuthHeader()()

  const [users, setUsers] = useState<User[]>([])
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [totalEntries, setTotalEntries] = useState<number>(0)
  const [urlParams, setUrlParams] = useSearchParams()
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState<boolean>(false)
  const [openInviteUserDialog, setOpenInviteUserDialog] = useState<boolean>(false)
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true)

  const sortAttribute = urlParams.get('sortAttribute')
  const sortDirection = urlParams.get('sortDirection')
  const searchFilter = urlParams.get('searchFilter')
  const searchTerm = urlParams.get('searchTerm')
  const page = urlParams.get('page')

  if (!accountId) throw new Error('Account ID is required')
  if (!authParams) throw new Error('Auth Params is required')

  const handleCloseCreateUserDialog = () => setOpenCreateUserDialog(false)
  const handleCloseInviteUserDialog = () => setOpenInviteUserDialog(false)

  useEffect(() => {
    const qualificationApiClient = new QualificationApiClient('http://localhost:3002', authToken, accountId)
    qualificationApiClient.getQualifications(accountId)
      .then(data => setQualifications(data))
  }, [accountId, authParams, authToken])

  useEffect(() => {
    setLoadingUsers(true)
    const userApiClient = new UserApiClient('http://localhost:3002', authToken, accountId)
    userApiClient.getUsers(searchTerm, sortAttribute, sortDirection, urlParams.get('searchFilter'), urlParams.get('page'))
      .then(data => {
        setUsers(data.data)
        handleChangeTotalEntries(data.total)
        urlParams.set('page', data.page.toString())
        setUrlParams(urlParams)
      })
      .finally(() => setLoadingUsers(false))
  }, [accountId, authParams, searchTerm, sortAttribute, sortDirection, urlParams, authToken])

  const toggleSearchFilter = (attribute: string): void => {
    const list = searchFilter ? searchFilter.split('%') : []
    const index = list.indexOf(attribute)
    if (index !== -1) {
      list.splice(index, 1)
    } else {
      list.push(attribute)
    }
    updateUrlParameter('searchFilter', list.join('%'))
    updateUrlParameter('page')
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    updateUrlParameter('searchTerm', event.target.value)
    updateUrlParameter('page')
  }

  const resetSearchFilter = (): void => {
    updateUrlParameter('searchFilter')
    updateUrlParameter('page')
  }

  const handleChangeSort = (attribute: SortAttribute): void => {
    const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC'
    if (attribute === sortAttribute) {
      updateUrlParameter('sortDirection', newSortDirection)
    } else {
      updateUrlParameter('sortAttribute', attribute)
      updateUrlParameter('sortDirection', 'ASC')
    }
  }

  const handleChangePagination = (page: number): void => {
    updateUrlParameter('page', page.toString())
  }

  const updateUrlParameter = (key: UrlParamKey, value?: string): void => {
    if (value) urlParams.set(key, value)
    if (!value) urlParams.delete(key)
    setUrlParams(urlParams)
  }

  const handleChangeTotalEntries = (number: number): void => setTotalEntries(number)

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Mitglieder' />
      <div className='py-4 flex justify-between'>
        <h2>Test</h2>
        <div className='flex justify-between gap-2'>
          <Input 
            variant='outlined'
            placeholder='Suche ...' 
            value={searchTerm != null ? searchTerm : undefined} 
            onChange={handleSearch} 
            startDecorator={<FontAwesomeIcon icon={icon({ name: 'search', style: 'solid' })} />} 
          />
          <Dropdown>
            <MenuButton endDecorator={<FontAwesomeIcon icon={icon({ name: 'caret-down', style: 'solid' })} />}>
              Hinzufügen
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => setOpenCreateUserDialog(true)}>
                <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} className='w-4 h-4' />
                Neu erstellen
              </MenuItem>
              <MenuItem onClick={() => setOpenInviteUserDialog(true)}>
                <FontAwesomeIcon icon={icon({ name: 'id-card', style: 'solid' })} className='w-4 h-4' />
                Bestehenden einladen
              </MenuItem>
            </Menu>
          </Dropdown>

          <Dropdown>
            <MenuButton endDecorator={<FontAwesomeIcon icon={icon({ name: 'caret-down', style: 'solid' })} />}>
              Qualifikation
            </MenuButton>
            <Menu>
              {qualifications.map((qualification) => (
                <MenuItem onClick={() => toggleSearchFilter(qualification.id)}>
                  <ListItemDecorator>{searchFilter?.includes(qualification.id) ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} /> : null}</ListItemDecorator>
                  {qualification.name}
                </MenuItem>
              ))}
              <ListDivider />
              <MenuItem onClick={resetSearchFilter}>
                Zurücksetzen
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>
      <UserTable 
        users={users}
        loadingUsers={loadingUsers}
        sortAttribute={sortAttribute}
        sortDirection={sortDirection}
        currentPage={page ? Number(page) : 1}
        totalEntries={totalEntries}
        accountId={accountId}
        handleChangeSort={handleChangeSort}
        resetSearchFilter={resetSearchFilter}
        handleChangePagination={handleChangePagination}
      />
      <CreateUserDialog isOpen={openCreateUserDialog} accountId={accountId} close={handleCloseCreateUserDialog} />
      <InviteUserDialog isOpen={openInviteUserDialog} accountId={accountId} close={handleCloseInviteUserDialog} />
    </StandardLayout>
  )
}

export default UsersPage