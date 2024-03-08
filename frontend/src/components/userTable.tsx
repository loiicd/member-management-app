import { FunctionComponent } from 'react'
import { User } from '../types/user'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import UserDialog from './userDialog'
import NewButton from './newButtom'
import Badge from './badge'
import IconButton from './iconButton'
import Dropwdown from './dropdown'

interface UserTableProps {
  users: User[]
  accountId: string
}

const UserTable: FunctionComponent<UserTableProps> = ({ users, accountId }) => {
  const navigate = useNavigate()

  return (
    <div>
    <div className='py-4 flex justify-between'>
      <h2>Test</h2>
      <div className='flex justify-between'>
        <NewButton>Filter</NewButton>
        <NewButton variant='transparent'>Test</NewButton>
        <Dropwdown text='Filter'>
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
            <th className='ps-4 py-2 pe-3'>Vorname</th>
            <th className='ps-3 py-2 pe-3'>Nachname</th>
            <th className='ps-3 py-2 pe-3'>Geburtsdatum</th>
            <th className='ps-3 py-2 pe-3'>Addresse</th>
            <th className='ps-3 py-2 pe-3'>Einsatzqualifikation</th>
            <th className='ps-3 py-2 pe-3'>Online Zugang</th>
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
              <td className='ps-3 py-2 pe-3'>{user.webaccess}</td>
              <td className='ps-3 py-2 pe-4 flex items-center justify-end'><IconButton icon={icon({ name: 'pen', style: 'solid' })}/></td>
            </tr>
          ))}
           {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
            <tr className='bg-white border-b cursor-pointer hover:bg-slate-100'>
              <td className='ps-4 py-2 pe-3'>Testus</td>
              <td className='ps-3 py-2 pe-3'>Probersa</td>
              <td className='ps-3 py-2 pe-3'>13.03.2003</td>
              <td className='ps-3 py-2 pe-3'>Hausen</td>
              <td className='ps-3 py-2 pe-3'></td>
              <td className='ps-3 py-2 pe-3'></td>
              <td className='ps-3 py-2 pe-4 flex items-center justify-end'><IconButton icon={icon({ name: 'pen', style: 'solid' })}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className='p-10'></div>

    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <UserDialog type='insert' accountId={accountId} />
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
              <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
              Actions
            </button>
            <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                <li>
                  <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                </li>
              </ul>
              <div className="py-1">
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
              </div>
            </div>
            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
              </svg>
              Filter
              <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                  <li className="flex items-center">
                    <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                  </li>
                  <li className="flex items-center">
                    <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                  </li>
                  <li className="flex items-center">
                    <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                  </li>
                  <li className="flex items-center">
                    <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                  </li>
                  <li className="flex items-center">
                    <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">Vorname</th>
                <th scope="col" className="px-4 py-3">Nachname</th>
                <th scope="col" className="px-4 py-3">Geburtsdatum</th>
                <th scope="col" className="px-4 py-3">Addresse</th>
                <th scope="col" className="px-4 py-3">Einsatzqualifikation</th>
                <th scope="col" className="px-4 py-3">Online Zugang</th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="hover:cursor-pointer">
              {users.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-700" onClick={() => navigate(`/44484414-a4db-4717-8507-26f5296409dd/user/${user.id}`)}> {/* HardCoded URL ACCOUNT */}
                  <td className="px-4 py-3">{user.firstname}</td>
                  <td className="px-4 py-3">{user.lastname}</td>
                  <td className="px-4 py-3">{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td className="px-4 py-3">{user.address}</td>
                  <td className="px-4 py-3">{user.qualifications.map((qualification) => qualification.abbreviation + ' ')}</td>
                  <td className="px-4 py-3">{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} size='xl' className='text-lime-600' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} size='xl' className='text-red-600' />}</td>

                  <td className="px-4 py-3 flex items-center justify-end">
                    <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                        <li>
                          <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                        </li>
                        <li>
                          <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">1000</span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </li>
                  <li>
                      <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                  </li>
                  <li>
                      <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                  </li>
                  <li>
                      <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                  </li>
                  <li>
                      <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                  </li>
                  <li>
                      <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                  </li>
                  <li>
                      <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span className="sr-only">Next</span>
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                      </a>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
  )
}

export default UserTable