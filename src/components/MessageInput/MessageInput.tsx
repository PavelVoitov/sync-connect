import s from 'components/MessageInput/MessageInput.module.css'
import {ChangeEvent} from "react";

type Props = {
	setMessage: (message: string) => void
	message: string
}

export const MessageInput = ({setMessage, message}: Props) => {


	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.currentTarget.value)
	}

	return (
		<div className={s.inputBlock}>
			<textarea value={message} placeholder={"Введите сообщение"} className={s.input} onChange={handleChange}></textarea>
		</div>
	)
}