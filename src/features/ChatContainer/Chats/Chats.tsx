import s from './Chats.module.css'
import {ChatCreator} from "features/ChatContainer/Chats/ChatCreator/ChatCreator";
import {Chat} from "features/ChatContainer/Chats/Chat/Chat";
import { useAppSelector} from "utils/redux-utils";
import {selectChats} from "features/ChatContainer/Chats/chatsSelectors";
import * as React from "react";
import {InputPhoneModal} from './InputPhoneModal/InputPhoneModal';



export const Chats = () => {
	const [open, setOpen] = React.useState(false);
	const chats = useAppSelector(selectChats)

	const openModal = () => {
		setOpen(true)
	}
	const closeModal = () => {
		setOpen(false)
	}

	return (
		<div className={s.chatsBlock}>
			{chats.map((c) => {
				return <Chat key={c.phoneNumber} phoneNumber={c.phoneNumber}/>
			})}
			<ChatCreator openModal={openModal}/>
			<InputPhoneModal open={open} closeModal={closeModal}/>
		</div>
	)
}