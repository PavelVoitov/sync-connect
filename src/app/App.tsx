import React, {useEffect, useState} from 'react';
import s from './App.module.css'
import {ChatContainer} from "features/ChatContainer/ChatContainer";
import {useAppSelector} from "utils/redux-utils";
import {LoginModal} from "features/Login/LoginModal";
import {selectIsLoggedIn, selectUser} from "features/Login/selectors";
import { useSelector } from 'react-redux';
import {Route, Routes} from "react-router-dom";
import {ErrorSnackbars} from "components/ErrorSnackbar/ErrorSnackbar";


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (isLoggedIn) {
      handleClose()
    }
    if (!isLoggedIn) {
      handleOpen()
    }
  }, [isLoggedIn, user])

  return (
    <div className={s.app}>
      <ErrorSnackbars/>
      <header className={s.header}></header>
      <Routes>
        <Route path="/" element={isLoggedIn ? <ChatContainer/> : <LoginModal open={open} handleClose={handleClose}/>}/>
        <Route path="/:chatId" element={isLoggedIn ? <ChatContainer/> : <LoginModal open={open} handleClose={handleClose}/>}/>
      </Routes>
    </div>
  );
}

export default App;
