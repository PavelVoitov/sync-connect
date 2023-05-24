import s from './MessagesField.module.css'
import {selectMessages} from "features/ChatContainer/Messages/MessagesField/messagesSelectors";
import {useAppSelector} from "utils/redux-utils";
import {Message} from "features/ChatContainer/Messages/Message/Message";
import {messagesThunks, MessageType} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {memo, useEffect} from "react";


type Props = {
	chatId: string | undefined
}

export const MessagesField = memo(({chatId}: Props) => {
const {getMessage} = messagesThunks
	const messages = useAppSelector(selectMessages)
	let messagesArr: any = []
	if (chatId) {
		messagesArr = messages[chatId]
	}

	useEffect(() => {
		if (chatId) {
			debugger
			getMessage({chatId: chatId})
			setInterval(() => {
				getMessage({chatId: chatId})
			}, 5000)
		}
	}, [])

	return (
		<div className={s.messagesFieldBlock}>
			{messagesArr !== undefined ? messagesArr.map((c: MessageType) => {return <Message key={c.messageId} message={c.message}/>}) : <div></div>}
		</div>
	)
})