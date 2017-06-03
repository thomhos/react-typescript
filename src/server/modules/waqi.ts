import axios from 'axios'
import { WaqiConfig } from 'config'
import * as express from 'express'

async function locations(req: express.Request, res: express.Response, next: express.NextFunction) {
    const url = WaqiConfig.base + '/feed/' + req.params.location + '/'
    const { data } = await axios.get(url, { params: { token: '97d80671c900af368388c7506610229512e4bec9' }})
    res.send(data)
}

export {
    locations,
}
