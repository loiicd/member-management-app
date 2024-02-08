import { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  accountId: string
}

const Sidebar: FunctionComponent<SidebarProps> = ({ accountId }) => {
  const navigate = useNavigate()

  return (
    <aside id='default-sidebar' className='fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0' aria-label='Sidenav'>
      <div className='overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <ul className='space-y-2'>
          <li className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:cursor-pointer' onClick={() => navigate(`/${accountId}/dashboard`)}>
            <FontAwesomeIcon className='w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' icon={icon({ name: 'house', style: 'solid' })} />
            <span className='ml-3'>Dashboard</span>
          </li>
          <li className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:cursor-pointer' onClick={() => navigate(`/${accountId}/users`)}>
            <FontAwesomeIcon className='w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' icon={icon({ name: 'users', style: 'solid' })} />
            <span className='ml-3'>Mitglieder</span>
          </li>
        </ul>
      </div>
      <div className='hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700'>
          <p className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600' onClick={() => navigate('/')} >
            <FontAwesomeIcon className='w-6 h-6' icon={icon({ name: 'folder-tree', style: 'solid' })} />
          </p>
          <p data-tooltip-target='tooltip-settings' className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600' onClick={() => navigate(`/${accountId}/settings`)}>
            <svg aria-hidden='true' className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z' clip-rule='evenodd'></path></svg>
          </p>
          <div id='tooltip-settings' role='tooltip' className='inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip'>
            Settings page
              <div className='tooltip-arrow' data-popper-arrow></div>
          </div>
          <button type='button' data-dropdown-toggle='language-dropdown' className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600'>
            <svg aria-hidden='true' className='h-5 w-5 rounded-full mt-0.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3900 3900'><path fill='#b22234' d='M0 0h7410v3900H0z'/><path d='M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0' stroke='#fff' stroke-width='300'/><path fill='#3c3b6e' d='M0 0h2964v2100H0z'/><g fill='#fff'><g id='d'><g id='c'><g id='e'><g id='b'><path id='a' d='M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z'/><use  y='420'/><use  y='840'/><use  y='1260'/></g><use  y='1680'/></g><use  x='247' y='210'/></g><use x='494'/></g><use x='988'/><use x='1976'/><use x='2470'/></g></svg>
          </button>
          <div className='hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700' id='language-dropdown'>
            <ul className='py-1' role='none'>
              <li>
                <a href='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600' role='menuitem'>
                  <div className='inline-flex items-center'>
                    <svg aria-hidden='true' className='h-3.5 w-3.5 rounded-full mr-2' xmlns='http://www.w3.org/2000/svg' id='flag-icon-css-us' viewBox='0 0 512 512'>
                      <g fill-rule='evenodd'>
                        <g stroke-width='1pt'>
                          <path fill='#bd3d44' d='M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z' transform='scale(3.9385)'/>
                          <path fill='#fff' d='M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z' transform='scale(3.9385)'/>
                        </g>
                        <path fill='#192f5d' d='M0 0h98.8v70H0z' transform='scale(3.9385)'/>
                        <path fill='#fff' d='M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z' transform='scale(3.9385)'/>
                      </g>
                    </svg>              
                    English (US)
                  </div>
                </a>
              </li>
              <li>
                <a href='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600' role='menuitem'>
                  <div className='inline-flex items-center'>
                    <svg aria-hidden='true' className='h-3.5 w-3.5 rounded-full mr-2' xmlns='http://www.w3.org/2000/svg' id='flag-icon-css-de' viewBox='0 0 512 512'>
                      <path fill='#ffce00' d='M0 341.3h512V512H0z'/>
                      <path d='M0 0h512v170.7H0z'/>
                      <path fill='#d00' d='M0 170.7h512v170.6H0z'/>
                    </svg>
                    Deutsch
                  </div>
                </a>
              </li>
              <li>
                <a href='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600' role='menuitem'>
                  <div className='inline-flex items-center'>
                    <svg aria-hidden='true' className='h-3.5 w-3.5 rounded-full mr-2' xmlns='http://www.w3.org/2000/svg' id='flag-icon-css-it' viewBox='0 0 512 512'>
                      <g fill-rule='evenodd' stroke-width='1pt'>
                        <path fill='#fff' d='M0 0h512v512H0z'/>
                        <path fill='#009246' d='M0 0h170.7v512H0z'/>
                        <path fill='#ce2b37' d='M341.3 0H512v512H341.3z'/>
                      </g>
                    </svg>              
                    Italiano
                  </div>
                </a>
              </li>
              <li>
                <a href='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600' role='menuitem'>
                  <div className='inline-flex items-center'>
                    <svg aria-hidden='true' className='h-3.5 w-3.5 rounded-full mr-2' xmlns='http://www.w3.org/2000/svg' id='flag-icon-css-cn' viewBox='0 0 512 512'>
                      <defs>
                        <path id='a' fill='#ffde00' d='M1-.3L-.7.8 0-1 .6.8-1-.3z'/>
                      </defs>
                      <path fill='#de2910' d='M0 0h512v512H0z'/>
                      <use width='30' height='20' transform='matrix(76.8 0 0 76.8 128 128)' />
                      <use width='30' height='20' transform='rotate(-121 142.6 -47) scale(25.5827)' />
                      <use width='30' height='20' transform='rotate(-98.1 198 -82) scale(25.6)' />
                      <use width='30' height='20' transform='rotate(-74 272.4 -114) scale(25.6137)' />
                      <use width='30' height='20' transform='matrix(16 -19.968 19.968 16 256 230.4)' />
                    </svg>
                    中文 (繁體)
                  </div>
                </a>
              </li>
            </ul>
          </div>
      </div>
    </aside>
  )
}

export default Sidebar