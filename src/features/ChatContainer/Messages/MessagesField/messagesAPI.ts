import { UserType } from 'features/Login/loginReducer';
import {instance} from "api/commonApi";


export const messagesAPI = {
	sendMessage: (arg: {chatId: string, message: string}, user: UserType) => {
		return instance.post<any>(`waInstance${user.idInstance}/SendMessage/${user.apiTokenInstance}`,
			arg)
	},
	getMessage: (user: UserType) => {
		return instance.get<any>(`waInstance${user.idInstance}/ReceiveNotification/${user.apiTokenInstance}`)
	},
	deleteNotification: (receiptId: string, user: UserType) => {
		return instance.delete<any>(`waInstance${user.idInstance}/DeleteNotification/${user.apiTokenInstance}/${receiptId}`)
	},
}





