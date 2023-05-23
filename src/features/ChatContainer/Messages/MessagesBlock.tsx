import s from './MessagesField.module.css'
import {Input} from "components/Input/Input";

export const MessagesBlock = () => {
	return (
		<div className={s.messagesBlock}>
			<Input/>
		</div>
	)
}