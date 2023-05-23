import s from './Chat.module.css'
import avatar from '../../../../assets/image/avatar.png'
import {useActions} from "utils/redux-utils";
import {chatsSliceActions} from "features/ChatContainer/Chats/chatsReducer";
import {Link} from "react-router-dom";

type Props = {
	phoneNumber: string
}

export const Chat = ({phoneNumber}: Props) => {
	const {deleteChat} = useActions(chatsSliceActions)

	const handleDeleteChat = () => {
		deleteChat({phoneNumber})
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
			<div className={s.close} onClick={handleDeleteChat}>
				закрыть
			</div>
		</div>
	)
}