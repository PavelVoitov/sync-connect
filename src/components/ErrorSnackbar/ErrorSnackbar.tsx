import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {AppDispatch, useAppSelector} from 'utils/redux-utils';
import {selectError} from "features/ChatContainer/Messages/MessagesField/messagesSelectors";
import {messagesActions} from "features/ChatContainer/Messages/MessagesField/messagesReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbars() {
    const error = useAppSelector(selectError)
    const isOpen = error !== null
    const dispatch = AppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(messagesActions.setError({error: null}))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}!
            </Alert>
        </Snackbar>
    );
}