interface NodeRequire { // tslint:disable-line 
	ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string ) => void;
}
