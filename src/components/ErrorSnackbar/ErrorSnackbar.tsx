import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from "react-redux";
import { AppDispatch } from 'utils/redux-utils';
import {ErrorType} from "features/ChatContainer/Messages/MessagesField/messagesReducer";
import {RootState} from "app/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbars() {
    const error = useSelector<RootState, ErrorType>(state => state.messages.error)
    const isOpen = error !== null
    const dispatch = AppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        // dispatch(appActions.setAppError({error: null}))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}!
            </Alert>
        </Snackbar>
    );
}