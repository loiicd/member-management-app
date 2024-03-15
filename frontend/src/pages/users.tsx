import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import StandardLayout from '../layout/standard'
import { User } from '../types/user'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { UserApiClient } from '../services/userApiClient'
import PageHead from '../components/pageHead'
import Button from '../components/core/Button'
import Dropwdown from '../components/dropdown'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getqualifications } from '../services/qualification'
import { Qualification } from '../types/qualification'
import UserTable from '../components/userTable'
import Input from '../components/core/Input'
import CreateUserDialog from '../components/createUserDialog'
import InviteUserDialog from '../components/inviteUserDialog'

const sortAttributes = ['firstname', 'lastname',  'birthdate', 'address', 'webaccess'] as const
export type SortAttribute = typeof sortAttributes[number]

const sortDirections = ['ASC', 'DESC'] as const
export type SortDirection = typeof sortDirections[number]

const urlParamKeys = ['sortAttribute', 'sortDirection', 'searchFilter', 'searchTerm', 'page'] as const
export type UrlParamKey = typeof urlParamKeys[number]

const UsersPage: FunctionComponent = () => {
  const { accountId } = useParams()
  const authParams = useAuthUser()()
  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  const [users, setUsers] = useState<User[]>([])
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [totalEntries, setTotalEntries] = useState<number>(0)
  const [urlParams, setUrlParams] = useSearchParams()
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState<boolean>(false)
  const [openInviteUserDialog, setOpenInviteUserDialog] = useState<boolean>(false)

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
    getqualifications(accountId)
      .then((data) => setQualifications(data))
  }, [accountId, authParams])

  useEffect(() => {
    userApiClient.getUsers(searchTerm, sortAttribute, sortDirection, urlParams.get('searchFilter'), urlParams.get('page'))
      .then(data => {
        setUsers(data.data)
        handleChangeTotalEntries(data.total)
        urlParams.set('page', data.page.toString())
        setUrlParams(urlParams)
        console.log(users)
      })
  }, [accountId, authParams, urlParams])

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
      <PageHead title='Mitglieder'>
        <Button>Test</Button>
      </PageHead>
      <div className='py-4 flex justify-between'>
        <h2>Test</h2>
        <div className='flex justify-between gap-2'>
          <Input placeholder='Suche ...' value={searchTerm != null ? searchTerm : undefined} onChange={handleSearch} startIcon={icon({ name: 'search', style: 'solid' })} />
          <Dropwdown text='Hinzufügen'>
            <ul className='py-2'>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer' onClick={() => setOpenCreateUserDialog(true)}>
                <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} className='w-4 h-4' />
                <span className='ms-2'>Neu erstellen</span>
              </li>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer' onClick={() => setOpenInviteUserDialog(true)}>
                <FontAwesomeIcon icon={icon({ name: 'id-card', style: 'solid' })} className='w-4 h-4' />
                <span className='ms-2'>Bestehenden einladen</span>
              </li>
            </ul>
          </Dropwdown>
          <Dropwdown text='Qualifikation' counter={searchFilter ? searchFilter.split('%').length : undefined}>
            <ul className='py-2'>
              {qualifications.map((qualification) => (
                <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer' onClick={() => toggleSearchFilter(qualification.id)}>
                  {searchFilter?.includes(qualification.id) ? 
                    <>
                      <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='w-4 h-4' />
                      <span className='ms-2'>{qualification.name}</span>
                    </>
                    : <span className='ms-6'>{qualification.name}</span>
                  }
                </li>
              ))}
              <li className='border-b my-2'></li>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer flex justify-center' onClick={resetSearchFilter}>Zurücksetzen</li>
            </ul>
          </Dropwdown>
        </div>
      </div>
      <UserTable 
        users={users}
        sortAttribute={sortAttribute}
        sortDirection={sortDirection}
        currentPage={page ? Number(page) : 1}
        totalEntries={totalEntries}
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