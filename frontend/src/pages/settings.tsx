import { useEffect, useState } from "react"
import Table from "../components/base/table/table"
import TableBody from "../components/base/table/tableBody"
import TableCell from "../components/base/table/tableCell"
import TableHead from "../components/base/table/tableHead"
import Typography from "../components/base/typography"
import Header from "../components/header"
import { getqualifications } from "../services/qualification"
import { Qualification } from "../types/qualification"
import QualificationDialog from "../components/qualificationDialog"
import { useParams } from "react-router-dom"
import Footer from "../components/footer"

const SettingsPage = () => {
  const [qualifications, setqualifications] = useState<Qualification[]>([])

  const { accountId } = useParams()

  console.log('Account ID', accountId)

  useEffect(() => {
    if (accountId) {
      getqualifications(accountId)
        .then((result) => setqualifications(result) ) 
    }
  }, [accountId])

  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between pb-2'>
          <Typography variant='h3'>Einstellungen</Typography>
          <div className='flex space-x-2'>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='border rounded-lg border-zinc-600 mt-2 p-4'></div>
          <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
            <div className='flex justify-between'>
              <Typography variant='h5'>Funktionen</Typography>
              <QualificationDialog type='insert' accountId={accountId as string} />
            </div>
            <Table>
              <TableHead>
                <tr>
                  <TableCell>Name</TableCell>
                </tr>
              </TableHead>
              <TableBody>
                {qualifications.map((qualification) => (
                  <tr key={qualification.id} className='bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600'>
                    <TableCell>{qualification.name}</TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SettingsPage