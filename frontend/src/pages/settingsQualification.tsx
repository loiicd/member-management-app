import { useEffect, useState } from "react"
import Typography from "../components/base/typography"
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
            <Typography variant='h5'>Qualifikationen</Typography>
            <QualificationDialog type='insert' accountId={accountId as string} />
          </div>
          <div className='border rounded-md'>
            <table className='w-full min-w-max table-auto text-left'>
              <thead className='bg-slate-50 text-slate-600 border-b'>
                <tr>
                  <th className='ps-4 py-2 pe-3'></th>
                  <th className='ps-4 py-2 pe-3'>Name</th>
                  <th className='ps-3 py-2 pe-3'>Abkürzung</th>
                  <th className='ps-3 py-2 pe-3'></th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((qualification) => (
                  <tr className='bg-white border-b hover:bg-slate-100'>
                    <th className='ps-4 py-2 pe-3'><div className='h-4 w-4 rounded-full' style={{ backgroundColor: qualification.color}}></div></th>
                    <td className='ps-4 py-2 pe-3'>{qualification.name}</td>
                    <td className='ps-3 py-2 pe-3'>{qualification.abbreviation}</td>
                    <td  className='ps-3 py-2 pe-4 flex items-center justify-end'>
                      <IconButton icon={icon({ name: 'pen', style: 'solid' })} onClick={() => alert('Not Implemented!')} />
                      <IconButton icon={icon({ name: 'trash', style: 'solid' })} onClick={() => alert('Not Implemented!')} />
                    </td>
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