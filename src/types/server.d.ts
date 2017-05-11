import { Application as ExpressApplication } from "express"
import { Configuration as WebpackConfiguration } from 'webpack'
import { WebpackDevMiddleware } from 'webpack-dev-middleware'
import { NextHandleFunction } from "connect"

export namespace Server {    
    
    type FrontendDevMiddleware = WebpackDevMiddleware & NextHandleFunction & FakeFileSystem

    interface FrontendProdOptions {
        publicPath: string;
        outputPath: string;
    }

    interface FakeFileSystem {
        fileSystem: {
            readFile: (path: string, callback: (err: Error, file: string) => void) => void
        }
    }

    interface Logger {
        error: (err: string) => void;
        appStarted: (port: number, host: string, tunnelStarted: string) => void;
    }

}