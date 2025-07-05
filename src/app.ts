import express, { Request, Response} from 'express'

import authRoutes from './routes/auth.routes'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded())

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.use('/auth', authRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});