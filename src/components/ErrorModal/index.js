import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {ModalContainer} from "./style";
import {Link} from "react-feather";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#E9E9E9',
        border: 0,
        outline: 0,
        width: 400,
        '@media (max-width:768px)': {
            maxWidth: '90%',
        },
        boxShadow: theme.shadows[5],
        padding: 0,
        borderRadius: 12
    },
}));

function ErrorModal({open, handleClose, titleError, errorMessage }) {
    const classes = useStyles();

    const onClose = () => {
        handleClose()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ModalContainer>
                            <div className={"middle-section"}>
                                <h2>
                                    {titleError}
                                </h2>
                                <p>
                                    {errorMessage}
                                </p>
                            </div>

                            <div className={"bottom-section"}>
                                <button onClick={handleClose}>
                                    Ok
                                </button>
                            </div>
                        </ModalContainer>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ErrorModal