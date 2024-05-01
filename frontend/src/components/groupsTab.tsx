import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "@mui/joy/Button"
import IconButton from "@mui/joy/IconButton"
import Table from "@mui/joy/Table"
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react"
import { Group } from "../types/group"
import { GroupApiClient } from "../services/groupApiClient"
import { useParams } from "react-router-dom"
import { useAuthHeader } from "react-auth-kit"
import CreateGroupDialog from "./createGroupDialog"
import UpdateGroupDialog from "./updateGroupDialog"

interface GroupsTabProps {
  addAlert: (color: string, message: string, timeout: number) => void
}

const GroupsTab: FunctionComponent<GroupsTabProps> = ({ addAlert }) => {
  const { accountId } = useParams()
  const authToken = useAuthHeader()()
  const [groups, setGroups] = useState<Group[]>([])

  const groupApiClient = useMemo(() => new GroupApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState<false | string>(false)

  if (!accountId) throw new Error('Account ID is required')

  const handleDelete = useCallback(async (id: string) => {
    await groupApiClient.deleteGroup(id)
      .then(() => addAlert('success', 'Qualifikation gelöscht', 3000))
      .catch(() => addAlert('danger', 'Fehler', 3000))
  }, [addAlert, groupApiClient])

  useEffect(() => {
    groupApiClient.getGroups(accountId)
      .then((data) => setGroups(data))
      .catch(error => alert(error))
  }, [accountId, groupApiClient, openCreateDialog, openUpdateDialog, handleDelete])

  return (
    <>
      <div className='flex justify-between'>
        <p className='text-black dark:text-white'>Gruppen</p>
        <Button onClick={() => setOpenCreateDialog(true)}>+ Neu</Button>
      </div>

      <Table variant='outlined' sx={{ backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Mitglieder</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr>
              <td style={{ width: '5%' }}><div className='h-4 w-4 rounded-full' style={{ backgroundColor: group.color}}></div></td>
              <td>{group.name}</td>
              <td>x</td>
              <td>
                <IconButton onClick={() => handleDelete(group.id)}>
                  <FontAwesomeIcon icon={icon({ name: 'trash', style: 'solid' })} className='text-gray-500' />
                </IconButton>
                <IconButton onClick={() => setOpenUpdateDialog(group.id)}>
                  <FontAwesomeIcon icon={icon({ name: 'pen', style: 'solid' })} className='text-gray-500' />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {openCreateDialog ? <CreateGroupDialog open={openCreateDialog} handleClose={() => setOpenCreateDialog(false)} addAlert={addAlert} /> : null}
      {typeof openUpdateDialog === 'string' ? 
        <UpdateGroupDialog 
          open={true} 
          groupId={openUpdateDialog} 
          addAlert={addAlert}
          handleClose={() => setOpenUpdateDialog(false)} 
        /> : null
      }
    </>
  )
}

export default GroupsTab