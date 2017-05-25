declare module NodeJS  {
    interface Global {
        __SERVER__: boolean
    }
}