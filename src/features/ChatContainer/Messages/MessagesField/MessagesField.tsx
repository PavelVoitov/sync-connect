import s from './MessagesField.module.css'
import {selectMessages} from "features/ChatContainer/Messages/MessagesField/messagesSelectors";
import {useAppSelector} from "utils/redux-utils";
import {Message} from "features/ChatContainer/Messages/Message/Message";
import {MessageType} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {memo} from "react";


type Props = {
	chatId: string | undefined
}

export const MessagesField = memo(({chatId}: Props) => {

	const messages = useAppSelector(selectMessages)
	let messagesArr: any = []
	if (chatId !== undefined) {
		messagesArr = messages[chatId]
		debugger
		console.log(messagesArr)
	}

	return (
		<div className={s.messagesFieldBlock}>
			{messagesArr !== undefined ? messagesArr.map((c: MessageType) => {return <Message key={c.messageId} message={c.message}/>}) : <div></div>}
		</div>
	)
})