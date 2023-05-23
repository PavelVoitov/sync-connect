import s from './ChatCreator.module.css'
import AddIcon from '@mui/icons-material/Add';

type Props = {
	openModal: () => void
}

export const ChatCreator = ({openModal}: Props) => {
	return (
		<div className={s.chatCreatorBlock}>
			<button onClick={openModal} className={s.plusWrapper}>
				<AddIcon fontSize={'large'}/>
			</button>
			<span className={s.chatCreatorSpan}>Добавить новый чат</span>
		</div>
	)
}
