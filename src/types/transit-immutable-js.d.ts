declare module 'transit-immutable-js' {
    export function toJSON<S>(immutable: S): string;
    export function fromJSON<S>(jsonString: string): S;
}