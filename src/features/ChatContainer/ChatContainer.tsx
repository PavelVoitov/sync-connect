import s from './ChatContainer.module.css'
import {Chats} from "features/ChatContainer/Chats/Chats";
import {MessagesBlock} from "features/ChatContainer/Messages/MessagesBlock";

type Props = {
	isOpenChat?: boolean
}
export const ChatContainer = ({isOpenChat}: Props) => {
	return (
		<div className={s.chatBlock}>
			<Chats/>
			<MessagesBlock isOpenChat={isOpenChat}/>
		</div>
	)
}