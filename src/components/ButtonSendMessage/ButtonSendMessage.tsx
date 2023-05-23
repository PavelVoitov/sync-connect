import SendIcon from '@mui/icons-material/Send';
import s from './ButtonSendMessage.module.css'

type Props = {
	handleSendMessage: () => void
}

export const ButtonSendMessage = ({handleSendMessage}: Props) => {

	return (
		<div>
			<button className={s.button} onClick={handleSendMessage}>
				<SendIcon color={'inherit'}/>
			</button>
		</div>
	)
}