import s from './Chats.module.css'
import {ChatCreator} from "features/ChatContainer/Chats/ChatCreator/ChatCreator";
import {Chat} from "features/ChatContainer/Chats/Chat/Chat";
import {useActions, useAppSelector} from "utils/redux-utils";
import {selectChats} from "features/ChatContainer/Chats/chatsSelectors";
import * as React from "react";
import {InputPhoneModal} from './InputPhoneModal/InputPhoneModal';
import {chatsSliceActions} from "features/ChatContainer/Chats/chatsReducer";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";



export const Chats = () => {
	const [open, setOpen] = React.useState(false);
	const chats = useAppSelector(selectChats)
	const {deleteChat} = useActions(chatsSliceActions)
	const navigate = useNavigate()
	const {phoneNumber} = useParams()

	const openModal = () => {
		setOpen(true)
	}
	const closeModal = () => {
		setOpen(false)
	}

	useEffect(() => {
		if (chats.length === 0) {
			return navigate( '/')
		}
		if (!chats.find(c => c.phoneNumber === phoneNumber)) {
			navigate(`/${chats[chats.length - 1].phoneNumber}`)
		}
	}, [chats])

	const handleDeleteChat = (phoneNumber: string) => {
		deleteChat({phoneNumber})
	}

	return (
		<div className={s.chatsBlock}>
			{chats.map((c) => {
				return <Chat key={c.phoneNumber} phoneNumber={c.phoneNumber} handleDeleteChat={handleDeleteChat}/>
			})}
			<ChatCreator openModal={openModal}/>
			<InputPhoneModal open={open} closeModal={closeModal}/>
		</div>
	)
}