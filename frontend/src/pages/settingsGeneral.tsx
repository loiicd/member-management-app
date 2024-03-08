import { useNavigate, useParams } from "react-router-dom"
import StandardLayout from "../layout/standard"
import PageHead from "../components/pageHead"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { useState } from "react"

const SettingsGeneralPage = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()

  const [color, setColor] = useState<string>('lime')

  const changeColor = (color: string) => setColor(color)

  if (!accountId) throw new Error('Account ID is required')

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Einstellungen'></PageHead>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-2'>
          <ul>
            <li className='px-3 py-2 rounded-lg cursor-pointer bg-gray-200 text-sm font-semibold' onClick={() => navigate(`/${accountId}/settings/general`)}>
              <FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} className='pe-2' />
              Allgemein
            </li>
            <li className='px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm text-slate-500' onClick={() => navigate(`/${accountId}/settings/qualification`)}>
              <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} className='pe-2' />
              Qualifikationen
            </li>
            <li className='px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm text-slate-500'>
              <FontAwesomeIcon icon={icon({ name: 'user-tag', style: 'solid' })} className='pe-2' />
              Rollen
            </li>
          </ul>
        </div>
        <div className='col-span-8'>
          <div className='flex justify-start gap-2'>
            <div className={`w-8 h-8 p-0.5 border-2 ${color === 'lime' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => changeColor('lime')}>
              <div className='w-full h-full rounded-full bg-lime-500'></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${color === 'red' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => changeColor('red')}>
              <div className='w-full h-full rounded-full bg-red-500'></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${color === 'blue' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => changeColor('blue')}>
              <div className='w-full h-full rounded-full bg-blue-500'></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${color === 'yellow' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => changeColor('yellow')}>
              <div className='w-full h-full rounded-full bg-yellow-500'></div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  )
}

export default SettingsGeneralPage