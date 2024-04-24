import { useEffect, useState } from "react"
import { Qualification } from "../types/qualification"
import QualificationDialog from "../components/qualificationDialog"
import { useNavigate, useParams } from "react-router-dom"
import StandardLayout from "../layout/standard"
import PageHead from "../components/pageHead"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import IconButton from "../components/iconButton"
import { QualificationApiClient } from "../services/qualificationApiClient"
import { useAuthHeader } from "react-auth-kit"

const SettingsQualificationPage = () => {
  const [qualifications, setqualifications] = useState<Qualification[]>([])
  const { accountId } = useParams()
  const authToken = useAuthHeader()()
  const navigate = useNavigate()

  if (!accountId) throw new Error('Account ID is required')

  useEffect(() => {
    const qualificationApiClient = new QualificationApiClient('http://localhost:3002', authToken, accountId)
    qualificationApiClient.getQualifications(accountId)
      .then(result => setqualifications(result)) 
  }, [accountId, authToken])

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Einstellungen'></PageHead>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-2'>
          <ul>
            <li className='px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm text-slate-500' onClick={() => navigate(`/${accountId}/settings/general`)}>
              <FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} className='pe-2' />
              Allgemein
            </li>
            <li className='px-3 py-2 rounded-lg cursor-pointer bg-gray-200 text-sm font-semibold' onClick={() => navigate(`/${accountId}/settings/qualification`)}>
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
          <div className='flex justify-between'>
            <p className='text-black dark:text-white'>Qualifikationen</p>
            <QualificationDialog type='insert' accountId={accountId as string} />
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer'></th>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer'>Name</th>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer'>Abkürzung</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {qualifications.map((qualification, index) => (
                  <tr key={qualification.id + index} className='cursor-pointer hover:bg-gray-50'>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'><div className='h-4 w-4 rounded-full' style={{ backgroundColor: qualification.color}}></div></td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{qualification.name}</td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{qualification.abbreviation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StandardLayout>
  )
}

export default SettingsQualificationPage