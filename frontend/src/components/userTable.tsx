import { FunctionComponent } from 'react'
import { User } from '../types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import Badge from './core/Badge'
import Button from './core/Button'
import { SortAttribute } from '../pages/users'

interface UserTableProps {
  users: User[]
  sortAttribute: string | null
  sortDirection: string | null
  currentPage: number
  totalEntries: number
  handleChangeSort: (attribute: SortAttribute) => void
  resetSearchFilter: () => void
  handleChangePagination: (page: number) => void
}

const UserTable: FunctionComponent<UserTableProps> = ({ users, sortAttribute, sortDirection, currentPage, totalEntries, handleChangeSort, resetSearchFilter, handleChangePagination }) => {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
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
          {users.map((user) => (
            <tr className='cursor-pointer hover:bg-gray-50' onClick={() => navigate(`/44484414-a4db-4717-8507-26f5296409dd/user/${user.id}`)}> {/* HardCoded URL ACCOUNT */}
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.firstname}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.lastname}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.address}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.qualifications.map((qualification) => <Badge color={qualification.color}>{qualification.abbreviation}</Badge>)}</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='text-lime-500' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} className='text-red-500' />}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <tfoot className='bg-slate-50'>
          <tr>
            <td colSpan={7}>
              <div className='flex justify-end gap-2 p-4'>
                {currentPage !== 1 ? 
                  <span className='hover:bg-slate-200 rounded h-6 px-2 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage - 1)}><FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='me-2' />Previous</span>
                  : <span className='rounded h-6 px-2 text-center text-slate-500 cursor-not-allowed'><FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='me-2' />Previous</span>
                }
                {[...Array(currentPage - 1)].map((_, index) => (
                  <span className='hover:bg-slate-200 rounded h-6 w-6 text-center cursor-pointer' onClick={() => handleChangePagination(index + 1)}>{index + 1}</span>  
                ))}
                <span className='rounded-md h-6 w-6 bg-blue-500 text-white text-center cursor-pointer'>{currentPage}</span>
                {/* {[...Array(Math.ceil(totalEntries / 5) - currentPage)].map((_, index) => (
                  <span className='hover:bg-slate-200 rounded h-6 w-6 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage + index + 1)}>{currentPage + index + 1}</span>  
                ))} */}
                {currentPage !== Math.ceil(totalEntries / 5) ? 
                  <span className='hover:bg-slate-200 rounded h-6 px-2 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage + 1)}>Next<FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='ms-2' /></span>
                  : <span className='rounded h-6 px-2 text-center text-slate-500 cursor-not-allowed' onClick={() => handleChangePagination(currentPage + 1)}>Next<FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='ms-2' /></span>
                }
              </div>
            </td>
          </tr>
        </tfoot>
    </div>



    // <div className='border rounded-md mb-4'>
    //   <table className='w-full min-w-max table-auto text-left'>
    //     <thead className='bg-slate-50 text-slate-600 border-b'>
    //       <tr>
    //         <th className='ps-4 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('firstname')}>
    //           Vorname
    //           {sortAttribute === 'firstname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute === 'firstname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute !== 'firstname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
    //         </th>
    //         <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('lastname')}>
    //           Nachname
    //           {sortAttribute === 'lastname' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute === 'lastname' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute !== 'lastname' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
    //         </th>
    //         <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('birthdate')}>
    //           Geburtsdatum
    //           {sortAttribute === 'birthdate' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute === 'birthdate' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute !== 'birthdate' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
    //         </th>
    //         <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('address')}>
    //           Addresse
    //           {sortAttribute === 'address' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute === 'address' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute !== 'address' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
    //         </th>
    //         <th className='ps-3 py-2 pe-3'>Qualifikation</th>
    //         <th className='ps-3 py-2 pe-3 cursor-pointer' onClick={() => handleChangeSort('webaccess')}>
    //           Online Zugang
    //           {sortAttribute === 'webaccess' && sortDirection === 'ASC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-down-short-wide', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute === 'webaccess' && sortDirection === 'DESC' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-wide-short', style: 'solid' })} className='ps-2' /> : null}
    //           {sortAttribute !== 'webaccess' ? <FontAwesomeIcon icon={icon({ name: 'arrow-up-z-a', style: 'solid' })} className='ps-2 text-slate-50' /> : null}
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user) => (
    //         <tr className='bg-white border-b cursor-pointer hover:bg-slate-100' onClick={() => navigate(`/44484414-a4db-4717-8507-26f5296409dd/user/${user.id}`)}> {/* HardCoded URL ACCOUNT */}
    //           <td className='ps-4 py-2 pe-3'>{user.firstname}</td>
    //           <td className='ps-3 py-2 pe-3'>{user.lastname}</td>
    //           <td className='ps-3 py-2 pe-3'>{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
    //           <td className='ps-3 py-2 pe-3'>{user.address}</td>
    //           <td className='ps-3 py-2 pe-3'>{user.qualifications.map((qualification) => <Badge color={qualification.color}>{qualification.abbreviation}</Badge>)}</td>
    //           <td className='ps-3 py-2 pe-3'>{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} className='text-lime-500' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} className='text-red-500' />}</td>
    //         </tr>
    //       ))}
    //       {users.length === 0 ? 
    //         <tr className='border-b'>
    //           <td colSpan={7} className='text-center py-8'>
    //             <div className='flex flex-col justify-center gap-2'>
    //               Keine passenden User gefunden!
    //               <div>
    //                 <Button onClick={resetSearchFilter}>Filter zurücksetzen</Button>
    //               </div>
    //             </div>
    //           </td>
    //         </tr>
    //         : null
    //       }
    //     </tbody>
        // <tfoot className='bg-slate-50'>
        //   <tr>
        //     <td colSpan={7}>
        //       <div className='flex justify-end gap-2 p-4'>
        //         {currentPage !== 1 ? 
        //           <span className='hover:bg-slate-200 rounded h-6 px-2 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage - 1)}><FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='me-2' />Previous</span>
        //           : <span className='rounded h-6 px-2 text-center text-slate-500 cursor-not-allowed'><FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='me-2' />Previous</span>
        //         }
        //         {[...Array(currentPage - 1)].map((_, index) => (
        //           <span className='hover:bg-slate-200 rounded h-6 w-6 text-center cursor-pointer' onClick={() => handleChangePagination(index + 1)}>{index + 1}</span>  
        //         ))}
        //         <span className='rounded-md h-6 w-6 bg-blue-500 text-white text-center cursor-pointer'>{currentPage}</span>
        //         {/* {[...Array(Math.ceil(totalEntries / 5) - currentPage)].map((_, index) => (
        //           <span className='hover:bg-slate-200 rounded h-6 w-6 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage + index + 1)}>{currentPage + index + 1}</span>  
        //         ))} */}
        //         {currentPage !== Math.ceil(totalEntries / 5) ? 
        //           <span className='hover:bg-slate-200 rounded h-6 px-2 text-center cursor-pointer' onClick={() => handleChangePagination(currentPage + 1)}>Next<FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='ms-2' /></span>
        //           : <span className='rounded h-6 px-2 text-center text-slate-500 cursor-not-allowed' onClick={() => handleChangePagination(currentPage + 1)}>Next<FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='ms-2' /></span>
        //         }
        //       </div>
        //     </td>
        //   </tr>
        // </tfoot>
    //   </table>
    // </div>
  )
}

export default UserTable