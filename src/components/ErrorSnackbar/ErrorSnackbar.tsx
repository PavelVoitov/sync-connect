import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useActions, useAppSelector} from 'utils/redux-utils';
import {selectError} from "features/ChatContainer/Messages/MessagesField/messagesSelectors";
import {messagesActions} from "features/ChatContainer/Messages/MessagesField/messagesReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbars() {
	const error = useAppSelector(selectError)
	const isOpen = error !== null
	const {setError} = useActions(messagesActions);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setError({error: null})
	};

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
				{error}!
			</Alert>
		</Snackbar>
	);
}