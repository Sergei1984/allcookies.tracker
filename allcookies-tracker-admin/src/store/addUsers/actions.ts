import { GET_ALL_USER_TYPE} from "./types";


export const getAllUserAction = () => {
	return {
		type: GET_ALL_USER_TYPE,
		payload:[]
	}
}

// export const createUserAction = (payload: IUser) => {
// 	return {
// 		type: USER,
// 		payload
// 	}
// }