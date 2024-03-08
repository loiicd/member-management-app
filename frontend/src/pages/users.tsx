import { useEffect, useState } from 'react'
import StandardLayout from '../layout/standard'
import { User } from '../types/user'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { UserApiClient } from '../services/userApiClient'
import PageHead from '../components/pageHead'
import NewButton from '../components/newButtom'
import UserDialog from '../components/userDialog'
import Dropwdown from '../components/dropdown'
import IconButton from '../components/iconButton'
import Badge from '../components/badge'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

const UsersPage = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  const [sortParams, setSortParams] = useSearchParams()

  let sortAttribute = sortParams.get('sortAttribute')
  let sortDirection = sortParams.get('sortDirection')

  const authParams = useAuthUser()()

  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  useEffect(() => {
    if (!accountId || !authParams) return
    userApiClient.getUsers(searchTerm, sortAttribute, sortDirection)
      .then(data => setUsers(data))
  }, [accountId, searchTerm, authParams, sortAttribute, sortDirection])

  if (!accountId) throw new Error('Account ID is required')
  if (!authParams) throw new Error('Auth Params is required')

  const handleChangeSort = (attribute: SortAttribute) => {
    if (attribute === sortAttribute) {
      if (sortDirection === 'ASC') {
        setSortParams({ sortAttribute: attribute, sortDirection: 'DESC' })
      } else {
        setSortParams({ sortAttribute: attribute, sortDirection: 'ASC' })
      }
    } else {
      setSortParams({ sortAttribute: attribute, sortDirection: 'ASC' })
    }
  }
  
  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Mitglieder'>
        <NewButton>Test</NewButton>
      </PageHead>
      <div className='py-4 flex justify-between'>
        <h2>Test</h2>
        <div className='flex justify-between'>
          <NewButton>Qualifikation</NewButton>
          <UserDialog type='insert' accountId={accountId} />
          <Dropwdown text='Qualifikation'>
            <ul className='py-2'>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer'>Property</li>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer'>Property</li>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer'>Property</li>
              <li className='mx-2 p-2 rounded-md hover:bg-slate-200 cursor-pointer'>Property</li>
            </ul>
          </Dropwdown>
        </div>
      </div>
      <div className='border rounded-md'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead className='bg-slate-50 text-slate-600 border-b'>
            <tr>
              <th className='ps-4 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('firstname')}>
                Vorname
                {sortAttribute === 'firstname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute === 'firstname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute !== 'firstname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
              </th>
              <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('lastname')}>
                Nachname
                {sortAttribute === 'lastname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute === 'lastname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute !== 'lastname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
              </th>
              <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('birthdate')}>
                Geburtsdatum
                {sortAttribute === 'birthdate' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute === 'birthdate' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute !== 'birthdate' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
              </th>
              <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('address')}>
                Addresse
                {sortAttribute === 'address' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute === 'address' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute !== 'address' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
              </th>
              <th className='ps-3 py-2 pe-3'>Qualifikation</th>
              <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('webaccess')}>
                Online Zugang
                {sortAttribute === 'webaccess' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute === 'webaccess' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
                {sortAttribute !== 'webaccess' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
              </th>
              <th className='ps-3 py-2 pe-4'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className='bg-white border-b cursor-pointer hover:bg-slate-100' onClick={() => navigate(`/44484414-a4db-4717-8507-26f5296409dd/user/${user.id}`)}> {/* HardCoded URL ACCOUNT */}
                <td className='ps-4 py-2 pe-3'>{user.firstname}</td>
                <td className='ps-3 py-2 pe-3'>{user.lastname}</td>
                <td className='ps-3 py-2 pe-3'>{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                <td className='ps-3 py-2 pe-3'>{user.address}</td>
                <td className='ps-3 py-2 pe-3'>{user.qualifications.map((qualification) => <Badge>{qualification.abbreviation}</Badge>)}</td>
                <td className='ps-3 py-2 pe-3'>{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='text-lime-500' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} className='text-red-500' />}</td>
                <td className='ps-3 py-2 pe-4 flex items-center justify-end'><IconButton icon={icon({ name: 'pen', style: 'solid' })}/></td>
              </tr>
            ))}
          </tbody>
          <tfoot className='bg-slate-50 text-slate-600'>
            <tr>
              Pagination
            </tr>
          </tfoot>
        </table>
      </div>
    </StandardLayout>
  )
}

export default UsersPage