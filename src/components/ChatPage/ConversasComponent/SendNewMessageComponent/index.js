import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import api from '../../../../services/api';
import { getSession } from "../../../../services/auth";
import config from "../../../../util/sessionHeader";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function sendMessage(){
    
    let message = document.querySelector('#message').value;
    let phoneInput = document.querySelector('#phoneNumber').value;
    let phoneNumber = phoneInput.replace(/\-/g, '').replace(/\ /g, '').replace(/\+/g, '');
    let phoneError = document.querySelector('#phoneError');
    
    // try{
    //   await api.get(`${getSession()}/check-number-status/${phoneNumber}`, config());
    //   console.log(phoneNumber);
    // }catch(e){
    //   console.log(e);
    // }


    try{
      await api.post(`${getSession()}/send-message`, {
        phone: phoneNumber,
        message: message
      }, config());
      phoneError.style.display = 'none';
      handleClose();
    }catch(e){
      console.log(e);
      phoneError.style.display = 'block'
    }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{textAlign:'center'}}>Send New Message</h2>
      <div style={{marginTop: '50px'}}>
        <h4>Phone:</h4>
        <input placeholder="55 11 99999 9999" type="phone" id="phoneNumber" style={{width: '100%'}}/>
        <span id="phoneError" style={{color: 'red', display:'none'}}>Number is not valid</span>
      </div>

      <div style={{marginTop:'50px'}}>
        <h4>Message:</h4>
        <textarea placeholder="Type a message you want to send" id="message" style={{height:'200px', width: '100%'}}/>
      </div>
      <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', padding: '10px'}}>
      <div className={classes.root}>
      <Button onClick={handleClose} variant="outlined" color="primary">
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </div>
      </div>
    </div>
  );

  return (
    <div>
      <Button style={{fontSize: 10}} variant="contained" color="primary" onClick={handleOpen}>
        Send New Message
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
