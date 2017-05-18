import * as express from 'express'
import { fork } from 'redux-saga/effects'
import { Server } from '../../types'

export default function(req: express.Request, { components, params }: Server.IsomorphicRenderProps) {
    return function * waitForAll() {
        const sagas = components.filter((component) => component && component.preload)
            .map((component) => component.preload(params, req))
            .reduce((result, results) => result.concat(results), [])

        for (const i of sagas) {
            yield fork(sagas[i])
        }
    }
}
