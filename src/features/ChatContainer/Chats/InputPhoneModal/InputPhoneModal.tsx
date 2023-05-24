import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {useActions, useAppSelector} from "utils/redux-utils";
import {chatsSliceActions} from "features/ChatContainer/Chats/chatsReducer";
import {selectChats, selectMaxChatsCount} from "features/ChatContainer/Chats/chatsSelectors";
import {CustomButton} from "components/CustomButton/CustomButton";
import { useNavigate } from 'react-router-dom';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 6,
	textAlign: 'center',
};

type Props = {
	open: boolean
	closeModal: () => void
}

export const InputPhoneModal = ({open, closeModal}: Props) => {
	const chats = useAppSelector(selectChats)
	const maxChatsCount = useAppSelector(selectMaxChatsCount)
	const {createChat} = useActions(chatsSliceActions)
	const [phoneNumber, setPhoneNumber] = React.useState('')
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const regex = /^(?=.*\d)[\d]{1,50}$/;
	const navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (regex.test(e.currentTarget.value)) {
			setError(false)
			setErrorMessage('')
			setPhoneNumber(e.currentTarget.value)
		} else {
		setError(true)
			setErrorMessage('Поле должно содержать только цифры (не более 50)')
		}
	}

	const addNewChat = () => {
		if (phoneNumber.trim() !== '') {
			createChat({phoneNumber})
			setPhoneNumber('')
			closeModal()
			navigate(`/${phoneNumber}`)
		} else {
			setError(true)
			setErrorMessage('Поле обязательно')
		}
	}

	const handleCloseModal = () => {
		setError(false)
		setErrorMessage('')
		closeModal()
	}

	return (
		<div>
			<Modal
				open={open}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
				{chats.length >= maxChatsCount ?
					<div>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h3"
							style={{marginBottom: 10}}
						>
							Создано максимально допустимое количество чатов.
						</Typography>
					</div>
					: <div style={{minHeight: 50}}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h3"
							style={{marginBottom: 10}}
						>
							Для создания чата введите номер телефона абонента в международном формате, не используя "+"
						</Typography>
						<div style={{minHeight: 80}}>
						<TextField
							error={error}
							helperText={errorMessage}
							onChange={handleChange}
							id="filled-number"
							label="Номер телефона абонента"
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
							style={{position: 'relative', width: '100%', top:0}}
						/>
							</div>
						<CustomButton onClick={addNewChat}>Создать</CustomButton>
					</div>
				}
				</Box>
		</Modal>
</div>
);
}