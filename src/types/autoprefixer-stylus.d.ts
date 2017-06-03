declare module 'autoprefixer-stylus' {
    interface AutoprefixerOptions {
        hideWarnings?: boolean
        browsers: string[]
    }

    function autoprefixer(opts: AutoprefixerOptions): () => any

    export = autoprefixer
}