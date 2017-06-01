declare module 'webpack-merge' {
    import { Configuration } from 'webpack'

    export function merge(...args: Configuration[]): Configuration
    export function multiple(...args: Configuration[]): Configuration
    export function smart(...args: Configuration[]): Configuration
    export function smartStrategy(options: any, ...args: Configuration[]): (...args: Configuration[]) => Configuration
    export function unique(...args: Configuration[]): Configuration

    export default merge
}
