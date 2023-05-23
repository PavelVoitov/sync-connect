import s from 'features/ChatContainer/Messages/MessagesBlock.module.css'
import {MessageInput} from "components/MessageInput/MessageInput";
import {MessagesField} from "features/ChatContainer/Messages/MessagesField/MessagesField";
import {ButtonSendMessage} from "components/ButtonSendMessage/ButtonSendMessage";
import LogoutIcon from '@mui/icons-material/Logout';
import {useActions, useAppSelector} from "utils/redux-utils";
import {userSliceActions} from "features/Login/loginReducer";
import {messagesThunks} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {useState} from "react";
import {selectUser} from "features/Login/selectors";
import {useParams} from "react-router-dom";

type Props = {
	isOpenChat?: boolean
}

export const MessagesBlock = ({isOpenChat}: Props) => {
	const {setUser, isAuth} = useActions(userSliceActions)
	const {sendMessage} = useActions(messagesThunks)
	const [message, setMessage] = useState('')
	const user = useAppSelector(selectUser)
	const {chatId} = useParams();

	// useEffect(()=> {
	// 	if (isOpenChat) {
	// 		setInterval(() => {}, 5000)
	// 	}
	// })

	const handleLogout = () => {
		isAuth(false)
		setUser({idInstance: '', apiTokenInstance: ''})
	}

	const handleSendMessage = () => {
		debugger
		console.log(chatId)
		if (chatId) {
			sendMessage({chatId, message, user})
		}
	}

	return (
		<div className={s.messagesBlock}>
			<div className={s.logout}>
				Выйти из аккаунта
				<button className={s.button} onClick={handleLogout}>
					<LogoutIcon/>
				</button>
			</div>
			<MessagesField chatId={chatId}/>
			<div className={s.sendMessageBlock}>
				<MessageInput message={message} setMessage={setMessage}/>
				<ButtonSendMessage handleSendMessage={handleSendMessage}/>
			</div>
		</div>
	)
}