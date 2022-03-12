
import React, { Fragment, useState } from 'react'
import HistoryRounded from "@mui/icons-material/HistoryRounded"
import logo from "../styles/img/logo.png"
import ModalComponent from './Modal'
export default function AppHeader() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <header className="app-header">
                <div className="app-header-label"><img src={logo} width="200px" /></div>
                <div className="app-header-history" onClick={handleOpen}><HistoryRounded cursor="pointer" fontSize="large"></HistoryRounded></div>
            </header>

            <ModalComponent onClose={handleClose} isOpen={open}></ModalComponent>
        </div>
    )
}
