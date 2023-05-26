import s from './MessagesField.module.css'
import {selectMessages} from "features/ChatContainer/Messages/MessagesField/messagesSelectors";
import {useActions, useAppSelector} from "utils/redux-utils";
import {Message} from "features/ChatContainer/Messages/Message/Message";
import {messagesThunks, MessageType} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {memo, useEffect, useRef} from "react";


type Props = {
	chatId: string | undefined
}

export const MessagesField = memo(({chatId}: Props) => {
	const {getMessage} = useActions(messagesThunks)
	const messages = useAppSelector(selectMessages)
	const messagesArr = chatId ? messages[chatId] : [];

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (chatId) {
			intervalRef.current = setInterval(() => {
				getMessage({chatId});
			}, 10000);
		} else {
			clearInterval(intervalRef.current!);
		}

		return () => {
			clearInterval(intervalRef.current!);
		};
	}, [chatId, getMessage]);

	return (
		<div className={s.messagesFieldBlock}>
			{messagesArr !== undefined ? messagesArr.map((c: MessageType) => {
				return <Message key={c.messageId} message={c.message}/>
			}) : <div></div>}
		</div>
	)
})