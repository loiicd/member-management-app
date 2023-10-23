import express from 'express'
import userRoutes from './routes/user'
import cors from 'cors'

const app = express()
const port = 3002

app.use(cors())

app.use('/user', userRoutes)

app.listen(port, async () => {
  console.log(`API Handler listening on port ${port}`)
})