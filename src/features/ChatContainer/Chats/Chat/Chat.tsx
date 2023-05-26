import s from './Chat.module.css'
import avatar from '../../../../assets/image/avatar.png'
import {Link} from "react-router-dom";

type Props = {
	handleDeleteChat: (phoneNumber: string) => void
	phoneNumber: string
}

export const Chat = ({phoneNumber, handleDeleteChat}: Props) => {

	const deleteChat = () => {
		handleDeleteChat(phoneNumber)
	}

	return (
		<div className={s.chatBlock}>
			<div className={s.photoNameBlock}>
				<div className={s.photo}>
					<Link to={`/${phoneNumber}`}>
						<img src={avatar} alt="user photo"/>
					</Link>
				</div>
				<div>
					<Link to={`/${phoneNumber}`}>
						{phoneNumber}
					</Link>
				</div>
			</div>
			<div className={s.close} onClick={deleteChat}>
				закрыть
			</div>
		</div>
	)
}