import { useEffect, useState } from "react"
import Typography from "../components/base/typography"
import { getqualifications } from "../services/qualification"
import { Qualification } from "../types/qualification"
import QualificationDialog from "../components/qualificationDialog"
import { useNavigate, useParams } from "react-router-dom"
import StandardLayout from "../layout/standard"
import PageHead from "../components/pageHead"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import IconButton from "../components/iconButton"

const SettingsGeneralPage = () => {
  const [qualifications, setqualifications] = useState<Qualification[]>([])
  const { accountId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (accountId) {
      getqualifications(accountId)
        .then((result) => setqualifications(result) ) 
    }
  }, [accountId])

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

        </div>
      </div>
    </StandardLayout>
  )
}

export default SettingsGeneralPage