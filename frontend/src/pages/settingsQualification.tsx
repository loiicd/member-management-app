import { useEffect, useMemo, useState } from "react"
import { Qualification } from "../types/qualification"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { QualificationApiClient } from "../services/qualificationApiClient"
import { useAuthHeader } from "react-auth-kit"
import AddQualificationDialog from "../components/addQualificationDialog"
import StandardLayout from "../layout/standard"
import PageHead from "../components/pageHead"
import UpdateQualificationDialog from "../components/updateQualificationDialog"
import Snackbar from '@mui/joy/Snackbar'
import Table from '@mui/joy/Table'
import IconButton from '@mui/joy/IconButton'

const SettingsQualificationPage = () => {
  const [qualifications, setqualifications] = useState<Qualification[]>([])
  const { accountId } = useParams()
  const authToken = useAuthHeader()()
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState<{id: number, color: any, message: string, timeout: number}[]>([])

  const qualificationApiClient = useMemo(() => new QualificationApiClient('http://localhost:3002', authToken, accountId), [authToken, accountId])

  if (!accountId) throw new Error('Account ID is required')

  const [openUpdateQualificationDialog, setOpenUpdateQualificationDialog] = useState<false | string>(false)

  const handleCloseDialog = () => {
    setOpenUpdateQualificationDialog(false)
  }

  useEffect(() => {
    qualificationApiClient.getQualifications(accountId)
      .then(result => setqualifications(result)) 
  }, [qualificationApiClient, accountId, openUpdateQualificationDialog])

  const handleDelete = async (id: string) => {
    await qualificationApiClient.deleteQualification(id)
      .then(() => addAlert('success', 'Qualifikation gelöscht', 3000))
  }

  const addAlert = (color: string, message: string, timeout: number) => {
    const id = Date.now() as number
    setAlerts([ ...alerts, { id, color, message, timeout }])
    setTimeout(() => removeAlert(id), timeout)
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

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
            <AddQualificationDialog addAlert={addAlert} accountId={accountId as string} />
          </div>

          <Table variant='outlined' sx={{ backgroundColor: 'white' }}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Abkürzung</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {qualifications.map((qualification) => (
                <tr>
                  <td style={{ width: '5%' }}><div className='h-4 w-4 rounded-full' style={{ backgroundColor: qualification.color}}></div></td>
                  <td>{qualification.name}</td>
                  <td>{qualification.abbreviation}</td>
                  <td>
                    <IconButton onClick={() => handleDelete(qualification.id)}>
                      <FontAwesomeIcon icon={icon({ name: 'trash', style: 'solid' })} className='text-gray-500 h-4 w-4' />
                    </IconButton>
                    <IconButton onClick={() => setOpenUpdateQualificationDialog(qualification.id)}>
                      <FontAwesomeIcon icon={icon({ name: 'pen', style: 'solid' })} className='text-gray-500 h-4 w-4' />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {typeof openUpdateQualificationDialog === 'string' ? 
        <UpdateQualificationDialog 
          open={true} 
          qualifcationId={openUpdateQualificationDialog} 
          addAlert={addAlert}
          handleClose={handleCloseDialog} 
        /> : null
      }
      {alerts.map((alert) => (
        <Snackbar 
          open 
          variant='soft' 
          color={alert.color}
          autoHideDuration={alert.timeout}
        >
          {alert.message}
        </Snackbar>
      ))}
    </StandardLayout>
  )
}

export default SettingsQualificationPage