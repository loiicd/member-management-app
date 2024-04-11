import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'
import { FunctionComponent } from 'react'

interface SidebarProps {
  accountId: string
}

const NewSidebar: FunctionComponent<SidebarProps> = ({ accountId }) => {
  const navigate = useNavigate()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    navigate('/login')  
  }

  return (
    <div className="absolute left-0 flex h-full w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            L
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4">
              <p className="cursor-pointer t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700" onClick={() => navigate(`/${accountId}/dashboard`)}>
                <FontAwesomeIcon icon={icon({ name: 'house', style: 'solid' })} />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Dashboard
                </span>
              </p>
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              <li>
                <p className="cursor-pointer group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700" onClick={() => navigate(`/${accountId}/users`)}>
                <FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Mitglieder
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={handleSignOut}
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
        <FontAwesomeIcon icon={icon({ name: 'right-from-bracket', style: 'solid' })} />
          <span
            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
          >
            Abmelden
          </span>
        </button>
      </div>
    </div>
  )
}

export default NewSidebar