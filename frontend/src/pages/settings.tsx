import { useEffect, useMemo, useState } from "react"
import { Qualification } from "../types/qualification"
import { useParams } from "react-router-dom"
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
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

const SettingsPage = () => {
  const [qualifications, setqualifications] = useState<Qualification[]>([])
  const { accountId } = useParams()
  const authToken = useAuthHeader()()
  const [alerts, setAlerts] = useState<{id: number, color: any, message: string, timeout: number}[]>([])

  const qualificationApiClient = useMemo(() => new QualificationApiClient('http://localhost:3002', authToken, accountId), [authToken, accountId])

  if (!accountId) throw new Error('Account ID is required')

  const [openUpdateQualificationDialog, setOpenUpdateQualificationDialog] = useState<false | string>(false)
  const [openAddQualificationDialog, setOpenAddQualificationDialog] = useState<boolean>(false)

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
      <Tabs>
        <TabList>
          <Tab>
            <FontAwesomeIcon icon={icon({ name: 'sliders', style: 'solid' })} />
              Allgemein
            </Tab>
          <Tab>
            <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} />
            Qualifikationen
          </Tab>
          <Tab disabled>
            <FontAwesomeIcon icon={icon({ name: 'user-astronaut', style: 'solid' })} />
            Rollen
          </Tab>
          <Tab disabled>
            <FontAwesomeIcon icon={icon({ name: 'user-group', style: 'solid' })} />
            Gruppen
          </Tab>
          <Tab disabled>
            <FontAwesomeIcon icon={icon({ name: 'shield-halved', style: 'solid' })} />
            Sicherheit
          </Tab>
        </TabList>
        <TabPanel value={0}>1</TabPanel>
        <TabPanel value={1}>
          <div className='flex justify-between'>
            <p className='text-black dark:text-white'>Qualifikationen</p>
            <Button onClick={() => setOpenAddQualificationDialog(true)}>+ Neu</Button>
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
        </TabPanel>
        <TabPanel value={2}>3</TabPanel>
      </Tabs>
      <AddQualificationDialog 
        open={openAddQualificationDialog}
        handleClose={() => setOpenAddQualificationDialog(false)}
        addAlert={addAlert}
      />
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

export default SettingsPage