/**
 * Logger middleware
 *
 * Has a few methods to log information.
 */

import * as chalk from "chalk"
import * as express from "express"
import * as ip from "ip"

const divider = chalk.gray("\n-----------------------------------")

/**
 * Called whenever there's an error on the server we want to print
 */
export function logError(err: string): void {
    console.error(chalk.red(err))
}

/**
 * Called when express.js app starts on given port w/o errors
 */
export function logAppStarted(port: number, host: string): void {
    /* If the server started, log it */
    console.log(`Server started ! ${chalk.green("✓")}`)

    /* Log the summary of URLs */
    console.log(`
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${host}:${port}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
}
