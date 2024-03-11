import { useEffect, useState } from 'react'
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

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

const UsersPage = () => {
  const { accountId } = useParams()
  const [users, setUsers] = useState<User[]>([])
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  const [urlParams, setUrlParams] = useSearchParams()

  let sortAttribute = urlParams.get('sortAttribute')
  let sortDirection = urlParams.get('sortDirection')
  let searchFilter = urlParams.get('searchFilter')

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
  }

  const resetSearchFilter = () => {
    urlParams.delete('searchFilter')
    setUrlParams(urlParams)
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
    userApiClient.getUsers(searchTerm, sortAttribute, sortDirection, urlParams.getAll('searchFilter'))
      .then(data => setUsers(data))
  }, [accountId, searchTerm, authParams, urlParams])

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

  console.log(urlParams.values)
  
  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Mitglieder'>
        <Button>Test</Button>
      </PageHead>
      <div className='py-4 flex justify-between'>
        <h2>Test</h2>
        <div className='flex justify-between gap-2'>
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
        handleChangeSort={handleChangeSort}
        resetSearchFilter={resetSearchFilter}
      />
    </StandardLayout>
  )
}

export default UsersPage