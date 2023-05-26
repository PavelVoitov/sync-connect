import s from 'features/ChatContainer/Messages/MessagesBlock.module.css'
import {MessageInput} from "components/MessageInput/MessageInput";
import {MessagesField} from "features/ChatContainer/Messages/MessagesField/MessagesField";
import {ButtonSendMessage} from "components/ButtonSendMessage/ButtonSendMessage";
import LogoutIcon from '@mui/icons-material/Logout';
import {useActions} from "utils/redux-utils";
import {userSliceActions} from "features/Login/loginReducer";
import {messagesActions, messagesThunks} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const MessagesBlock = () => {
	const {setUser, isAuth} = useActions(userSliceActions)
	const {sendMessage} = useActions(messagesThunks)
	const [message, setMessage] = useState('')
	const {chatId} = useParams();
	const navigate = useNavigate()

	const handleLogout = () => {
		isAuth(false)
		setUser({idInstance: '', apiTokenInstance: ''})
		navigate('/')
	}

	const handleSendMessage = () => {
		if (chatId) {
			if (message.trim() !== '') {
				setMessage('')
				sendMessage({chatId, message})
			} else {
				messagesActions.setError({error: 'Введите сообщение'})
			}
		} else {
			messagesActions.setError({error: 'Создайте новый чат для отправки сообщений'})
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