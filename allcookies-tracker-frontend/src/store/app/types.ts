export interface AppState {
    notification: Notification
}

export interface Notification {
    error: boolean,
    message: string,
    show: boolean
}