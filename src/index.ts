import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { DevelopmentLog } from './core/utils/dev.js'
import { AddressInfo } from 'src/index'
import { ENV, PORT } from './config/config.js'

import Routes from './routes/base-route.js'
import { ExpressRequest } from './routes/middlewares/express-validate.js'

const app: Application = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    DevelopmentLog(req.originalUrl)
    next()
})

app.use(ExpressRequest)

app.use('/api', Routes)

app.get('/api', (req: Request, res: Response) => {
    console.log('hi');
    
    return res.status(200).json({
        status: 'OK',
        version: ENV.NPM_VERSION,
        message: 'server is up and running...'
    })
})

app.get('/api-v2', (req: Request, res: Response) => {
    console.log('hi');
    
    return res.status(200).json({
        status: 'OK',
        version: ENV.NPM_VERSION,
        message: 'server is up and running...'
    })
})

app.use('*', (req: Request, res: Response) => {
    return res.sendStatus(403)
})

const server = app.listen(ENV.PORT || PORT, () => {
    const { address, port } = server.address() as AddressInfo
    console.log(`Server is Running in [${ ENV.NODE_ENV.toUpperCase() }] http://${ address }:${ port }`)
})
