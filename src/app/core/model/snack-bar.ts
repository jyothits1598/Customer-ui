export enum SnackBarType{
    error,
    info,
    success
}

export interface SnackBar{
    type: SnackBarType,
    message: string
}