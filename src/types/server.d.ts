import { Application as ExpressApplication } from "express"
import { Configuration as WebpackConfiguration } from 'webpack'
import { WebpackDevMiddleware } from 'webpack-dev-middleware'
import { NextHandleFunction } from "connect"

export namespace Server {

    interface ServerConfig {
        host: string
        port: number
    }

    interface Config {
        dev: ServerConfig,
        prod: ServerConfig
    }


    interface IsomorphicStyleChunk {
        application: string;
    }

    interface IsomorphicJavascriptChunk {
        app: string;
        common: string;
    }

    interface IsomorphicChunks {
        styles: IsomorphicStyleChunk;
        javascript: IsomorphicJavascriptChunk;
    }

    interface IsomorphicWebpackParams {
        chunks: () => IsomorphicChunks;
    }

    interface IsomorphicRenderProps {
        components: any[];
        params: any;
    }

}