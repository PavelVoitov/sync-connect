import React, {useEffect, useState} from 'react';
import s from './App.module.css'
import {ChatContainer} from "features/ChatContainer/ChatContainer";
import {useAppSelector} from "utils/redux-utils";
import {LoginModal} from "features/Login/LoginModal";
import {selectIsLoggedIn, selectUser} from "features/Login/selectors";
import { useSelector } from 'react-redux';
import {Route, Routes} from "react-router-dom";


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useAppSelector(selectUser)
  console.log(isLoggedIn)

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
      <header className={s.header}></header>
      <Routes>
        <Route path="/" element={isLoggedIn ? <ChatContainer/> : <LoginModal open={open} handleClose={handleClose}/>}/>
        <Route path="/:chatId" element={isLoggedIn ? <ChatContainer isOpenChat={true}/> : <LoginModal open={open} handleClose={handleClose}/>}/>
      </Routes>
    </div>
  );
}

export default App;
