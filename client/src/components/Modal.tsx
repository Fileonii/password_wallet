
import { Box, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SxProps } from '@mui/system';
import PurchaseService from '../api/classes/Purchase';
import { IPurchase } from '../api/helpers';
import { IModalInfo } from './PurchaseForm';
interface IModal {
    onClose: () => void;
    isOpen: boolean;
    infoMode?: boolean;
    info?: IModalInfo;
}
function ModalComponent({ onClose, isOpen, infoMode, info }: IModal) {
    const [purchase, setPurchase] = useState<IPurchase[]>([]);
    const style: SxProps = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: infoMode ? 400 : 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: infoMode ? 100 : 500,
        overflowY: 'scroll',
    };
    const handleClose = () => {
        onClose();
    };
    const getPurchases = async () => {
        setPurchase(await PurchaseService.getPurchase());
    }

    useEffect(() => {
        if (!infoMode) {
            getPurchases();
        }
    }, [isOpen])
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-box"
            >
                <Box className="modal-box-content" sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {infoMode ? info?.label : "Ostatnie zamowienia"}
                    </Typography>
                    <Typography component={'div'} id="modal-modal-description" sx={{
                        mt: 2,
                    }}>
                        {infoMode ? info?.content : (
                            <table className="modal-table">
                                <tbody>
                                    <tr>
                                        <th>Kupujący</th>
                                        <th>Sprzedawca</th>
                                        <th>Produkty</th>
                                    </tr>
                                    {purchase.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.buyer}</td>
                                                <td>{item.seller}</td>
                                                <td>{item.products.map((product) => {
                                                    return (<div>{product.type}, </div>);
                                                })}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>)}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalComponent
