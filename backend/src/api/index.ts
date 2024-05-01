import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import accountRoutes from './routes/account'
import userRoutes from './routes/user'
import authenticateRoutes from './routes/authenticate'
import registrationRoutes from './routes/registration'
import qualificationRoute from './routes/qualification'
import groupRoute from './routes/group'

const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())

app.use('/account', accountRoutes)
app.use('/user', userRoutes)
app.use('/authenticate', authenticateRoutes)
app.use('/registration', registrationRoutes)
app.use('/qualification', qualificationRoute)
app.use('/group', groupRoute)

app.listen(port, async () => {
  console.log(`API Handler listening on port ${port}`)
})