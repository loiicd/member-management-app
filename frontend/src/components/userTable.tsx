import { FunctionComponent } from 'react'
import { User } from '../types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import IconButton from './iconButton'
import { useNavigate } from 'react-router-dom'
import Badge from './badge'
import Button from './Button'
import { SortAttribute } from '../pages/users'

interface UserTableProps {
  users: User[]
  sortAttribute: string | null
  sortDirection: string | null
  handleChangeSort: (attribute: SortAttribute) => void
  resetSearchFilter: () => void
}

const UserTable: FunctionComponent<UserTableProps> = ({ users, sortAttribute, sortDirection, handleChangeSort, resetSearchFilter }) => {
  const navigate = useNavigate()

  return (
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
          {users.length === 0 ? 
            <tr className='border-b'>
              <td colSpan={7} className='text-center py-8'>
                <div className='flex flex-col justify-center gap-2'>
                  Keine passenden User gefunden!
                  <div>
                    <Button onClick={resetSearchFilter}>Filter zurücksetzen</Button>
                  </div>
                </div>
              </td>
            </tr>
            : null
          }
        </tbody>
        <tfoot className='bg-slate-50 text-slate-600'>
          <tr>
            Pagination
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default UserTable