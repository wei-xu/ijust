export type CheckinButtonData = {
    id: string,
    message: string,
    created_at: number, // timestamp
    version: number,
    color: string // hex string
}

export type CheckinData = {
    id: string, // this is button id from CheckinButtonData
    checkin_timestamp: number
}