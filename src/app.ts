import express, { Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth.routes'
import accountRoutes from './routes/accounts.routes'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.use('/auth', authRoutes)
app.use('/accounts', accountRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});