import { ChangeEvent, useEffect, useState } from 'react'
import StandardLayout from '../layout/standard'
import { User } from '../types/user'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { UserApiClient } from '../services/userApiClient'
import PageHead from '../components/pageHead'
import Button from '../components/core/Button'
import UserDialog from '../components/userDialog'
import Dropwdown from '../components/dropdown'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getqualifications } from '../services/qualification'
import { Qualification } from '../types/qualification'
import UserTable from '../components/userTable'
import Input from '../components/core/Input'

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

const UsersPage = () => {
  const { accountId } = useParams()
  const [users, setUsers] = useState<User[]>([])
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [totalEntries, setTotalEntries] = useState<number>(0)

  const [urlParams, setUrlParams] = useSearchParams()

  let sortAttribute = urlParams.get('sortAttribute')
  let sortDirection = urlParams.get('sortDirection')
  let searchFilter = urlParams.get('searchFilter')
  const searchTerm = urlParams.get('searchTerm')
  const page = urlParams.get('page')

  const toogleSearchFilter = (attribute: string) => {
    if (searchFilter && searchFilter.includes(attribute)) {
      const list = searchFilter.split('%').filter(e => e !== attribute)
      urlParams.set('searchFilter', list.join('%'))
      setUrlParams(urlParams)
    } else if (searchFilter && !searchFilter.includes(attribute)) {
      const list = searchFilter.split('%')
      list.push(attribute)
      urlParams.set('searchFilter', list.join('%'))
      setUrlParams(urlParams)
    } else {
      urlParams.set('searchFilter', attribute)
      setUrlParams(urlParams)
    }
    resetPagination()
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    urlParams.set('searchTerm', event.target.value)
    setUrlParams(urlParams)
    resetPagination()
  }

  const resetSearchFilter = () => {
    urlParams.delete('searchFilter')
    setUrlParams(urlParams)
    resetPagination()
  }

  const handleChangeTotalEntries = (number: number) => {
    setTotalEntries(number)
  }

  const authParams = useAuthUser()()

  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  useEffect(() => {
    if (!accountId || !authParams) return
    getqualifications(accountId)
      .then((data) => setQualifications(data))
  }, [accountId, authParams])

  useEffect(() => {
    if (!accountId || !authParams) return
    userApiClient.getUsers(urlParams.get('searchTerm'), sortAttribute, sortDirection, urlParams.getAll('searchFilter'), urlParams.get('page'))
      .then(data => {
        setUsers(data.data)
        handleChangeTotalEntries(data.total)
        urlParams.set('page', data.page.toString())
        setUrlParams(urlParams)
      })
  }, [accountId, authParams, urlParams])

  if (!accountId) throw new Error('Account ID is required')
  if (!authParams) throw new Error('Auth Params is required')

  const handleChangeSort = (attribute: SortAttribute) => {
    if (attribute === sortAttribute) {
      if (sortDirection === 'ASC') {
        urlParams.set('sortDirection', 'DESC')
        setUrlParams(urlParams)
      } else {
        urlParams.set('sortDirection', 'ASC')
        setUrlParams(urlParams)
      }
    } else {
      urlParams.set('sortAttribute', attribute)
      urlParams.set('sortDirection', 'ASC')
      setUrlParams(urlParams)
    }
  }

  const handleChangePagination = (page: number) => {
    urlParams.set('page', page.toString())
    setUrlParams(urlParams)
  }

  const resetPagination = () => {
    urlParams.delete('page')
    setUrlParams(urlParams)
  }
  
  console.log('Users:', users)

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Mitglieder'>
        <Button>Test</Button>
      </PageHead>
      <div className='py-4 flex justify-between'>
        <h2>Test</h2>
        <div className='flex justify-between gap-2'>
          <Input placeholder='Suche ...' value={searchTerm != null ? searchTerm : undefined} onChange={handleSearch} startIcon={icon({ name: 'search', style: 'solid' })} />
          <UserDialog type='insert' accountId={accountId} />
          <Dropwdown text='Qualifikation' counter={searchFilter ? searchFilter.split('%').length : undefined}>
            <ul className='py-2'>
              {qualifications.map((qualification) => (
                <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer' onClick={() => toogleSearchFilter(qualification.id)}>
                  {searchFilter?.includes(qualification.id) ? 
                    <>
                      <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='w-4' />
                      <span className='ms-2'>{qualification.name}</span>
                    </>
                    :
                    <span className='ms-6'>{qualification.name}</span>
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
    </StandardLayout>
  )
}

export default UsersPage