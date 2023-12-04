import express from 'express'
import userRoutes from './routes/user'
import authenticateRoutes from './routes/authenticate'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/authenticate', authenticateRoutes)

app.listen(port, async () => {
  console.log(`API Handler listening on port ${port}`)
})