import React from 'react';
import {Formik, Form, Field} from 'formik';
import {Box, Typography, Modal} from '@mui/material';
import {FormControl, FormGroup, InputLabel, Input} from '@mui/material';
import {userSliceActions, UserType} from 'features/Login/loginReducer';
import {useActions, useAppSelector} from 'utils/redux-utils';
import * as yup from 'yup';
import {selectUser} from 'features/Login/selectors';
import {ErrorMessageField} from "components/ErrorMessageField/ErrorMessageField";
import {CustomButton} from "components/CustomButton/CustomButton";
import {useNavigate} from "react-router-dom";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

type Props = {
	open: boolean;
	handleClose: () => void;
};

export const LoginModal = ({open, handleClose}: Props) => {
	const navigate = useNavigate()
	const {setUser, isAuth} = useActions(userSliceActions);
	const schema = yup.object({
		idInstance: yup.string().required('Поле обязательно'),
		apiTokenInstance: yup.string().required('Поле обязательно'),
	});

	const user = useAppSelector(selectUser);
	console.log(user);

	const initialValues: UserType = {
		idInstance: '',
		apiTokenInstance: '',
	};

	const onSubmit = (data: UserType) => {
		isAuth(true);
		setUser(data);
		handleClose();
		navigate('/')
	};

	return (
		<Modal
			open={open}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<FormControl>
					<Typography
						marginBottom={'20px'}
						component="h2"
						sx={{fontSize: '24px', fontWeight: '600', textAlign: 'center'}}
					>
						Введите свои учетные данные из системы GREEN-API:
					</Typography>
					<Formik
						initialValues={initialValues}
						validationSchema={schema}
						onSubmit={onSubmit}
					>
						<Form>
							<FormGroup sx={{alignItems: 'center', fontSize: '16px', fontWeight: '500'}}>
								<FormControl sx={{width: '35ch', marginBottom: '10px'}} variant="standard">
									<InputLabel htmlFor="idInstance">IdInstance</InputLabel>
									<Field as={Input} id="idInstance" name="idInstance"/>
									<ErrorMessageField/>
								</FormControl>
							</FormGroup>
							<FormGroup sx={{alignItems: 'center', fontSize: '16px', fontWeight: '500'}}>
								<FormControl sx={{width: '35ch'}} variant="standard">
									<InputLabel htmlFor="apiTokenInstance">ApiTokenInstance</InputLabel>
									<Field as={Input} id="apiTokenInstance" name="apiTokenInstance"/>
									<ErrorMessageField/>
								</FormControl>
								<CustomButton type="submit">Войти</CustomButton>
							</FormGroup>
						</Form>
					</Formik>
				</FormControl>
			</Box>
		</Modal>
	);
};
