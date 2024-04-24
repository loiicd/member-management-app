import { FunctionComponent } from 'react'
import { User } from '../types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import Badge from './core/Badge'
import { SortAttribute } from '../pages/users'

interface UserTableProps {
  users: User[]
  loadingUsers: boolean
  sortAttribute: string | null
  sortDirection: string | null
  currentPage: number
  totalEntries: number
  accountId: string
  handleChangeSort: (attribute: SortAttribute) => void
  resetSearchFilter: () => void
  handleChangePagination: (page: number) => void
}

const UserTable: FunctionComponent<UserTableProps> = ({ users, loadingUsers, sortAttribute, sortDirection, currentPage, totalEntries, accountId, handleChangeSort, resetSearchFilter, handleChangePagination }) => {
  const navigate = useNavigate()

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEntries / 25); i++) {
    pageNumbers.push(i)
 }

  return (
    <>
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr key='0'>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => handleChangeSort('firstname')}>
              Vorname
              {sortAttribute === 'firstname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute === 'firstname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute !== 'firstname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => handleChangeSort('lastname')}>
              Nachname
              {sortAttribute === 'lastname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute === 'lastname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute !== 'lastname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => handleChangeSort('birthdate')}>
              Geburtsdatum
              {sortAttribute === 'birthdate' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute === 'birthdate' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute !== 'birthdate' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => handleChangeSort('address')}>
              Addresse
              {sortAttribute === 'address' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute === 'address' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute !== 'address' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Qualifikationen</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => handleChangeSort('webaccess')}>
              Online Zugang
              {sortAttribute === 'webaccess' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute === 'webaccess' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
              {sortAttribute !== 'webaccess' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id + index} className='cursor-pointer hover:bg-gray-50' onClick={() => navigate(`/${accountId}/user/${user.id}`)}>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.firstname}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.lastname}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.address}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'><div className='flex gap-2'>{user.qualifications.map((qualification, index) => <Badge key={user.id + qualification.id + index} color={qualification.color}>{qualification.abbreviation}</Badge>)}</div></td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='text-lime-500' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} className='text-red-500' />}</td>
            </tr>
          ))}
          {loadingUsers && users.length === 0 ? <tr><td colSpan={7} className='text-center py-4'><FontAwesomeIcon icon={icon({ name: 'spinner', style: 'solid' })} className='w-8 h-8 animate-spin' /></td></tr> : null}
        </tbody>
      </table>
  
    <div className='rounded-b-lg border-t border-gray-200 px-4 py-2'>
      <ol className='flex justify-end gap-1 text-xs font-medium'>
        <li 
          onClick={() => handleChangePagination(currentPage - 1)}
          className="cursor-pointer inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 w-8 h-8"
        >
          <span className="sr-only">Prev Page</span>
          <FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='w-3 h-3' />
        </li>

        {pageNumbers.map((pageNumber) => (
          <li 
            onClick={() => handleChangePagination(pageNumber)}
            className={`cursor-pointer block rounded text-center leading-8 w-8 h-8 ${pageNumber === currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900'}`}
          >
            {pageNumber}
          </li>
        ))}
  
        <li 
          onClick={() => handleChangePagination(currentPage + 1)}
          className="cursor-pointer inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 w-8 h-8"
        >
          <span className="sr-only">Next Page</span>
          <FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='w-3 h-3' />
        </li>
      </ol>
    </div>
  </div>
  </>
  )
}

export default UserTable