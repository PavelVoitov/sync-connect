import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Typography, Modal } from '@mui/material';
import { FormControl, FormGroup, InputLabel, Input } from '@mui/material';
import { userSliceActions, UserType } from 'features/Login/login-reducer';
import { useActions, useAppSelector } from 'utils/redux-utils';
import * as yup from 'yup';
import { selectUser } from 'features/Login/selectors';

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

export const LoginModal = ({ open, handleClose }: Props) => {
	const { setUser, isAuth } = useActions(userSliceActions);
	const schema = yup.object({
		idInstance: yup.string().required('IdInstance обязательно'),
		apiTokenInstance: yup.string().required('ApiTokenInstance обязательно'),
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
						component="h1"
						sx={{ fontSize: '26px', fontWeight: '600' }}
					>
						Введите свои учетные данные
					</Typography>
					<Formik
						initialValues={initialValues}
						validationSchema={schema}
						onSubmit={onSubmit}
					>
						<Form>
							<FormGroup sx={{ alignItems: 'center', fontSize: '16px', fontWeight: '500' }}>
								<FormControl sx={{ width: '35ch' }} variant="standard">
									<InputLabel htmlFor="idInstance">IdInstance</InputLabel>
									<Field as={Input} id="idInstance" name="idInstance" />
									<ErrorMessage name="idInstance" component="div" />
								</FormControl>
							</FormGroup>
							<FormGroup sx={{ alignItems: 'center', fontSize: '16px', fontWeight: '500' }}>
								<FormControl sx={{ width: '35ch' }} variant="standard">
									<InputLabel htmlFor="apiTokenInstance">ApiTokenInstance</InputLabel>
									<Field as={Input} id="apiTokenInstance" name="apiTokenInstance" />
									<ErrorMessage name="apiTokenInstance" component="div" />
								</FormControl>
								<button
									type="submit"
									style={{
										borderRadius: '30px',
										marginTop: '40px',
										width: '100%',
										padding: '17px 0',
										fontSize: '16px',
										fontWeight: '500',
									}}
								>
									Войти
								</button>
							</FormGroup>
						</Form>
					</Formik>
				</FormControl>
			</Box>
		</Modal>
	);
};
