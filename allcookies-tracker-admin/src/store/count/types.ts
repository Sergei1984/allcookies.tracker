export interface CountStore {
    count: number
}

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

interface IncrementCountAction {
    type: typeof INCREMENT;
    payload: number;
}

interface DecrementCountAction {
    type: typeof DECREMENT;
    payload: number;
}

export type CountType = IncrementCountAction | DecrementCountAction;