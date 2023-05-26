import s from './ChatContainer.module.css'
import {Chats} from "features/ChatContainer/Chats/Chats";
import {MessagesBlock} from "features/ChatContainer/Messages/MessagesBlock";

export const ChatContainer = () => {
	return (
		<div className={s.chatBlock}>
			<Chats/>
			<MessagesBlock/>
		</div>
	)
}