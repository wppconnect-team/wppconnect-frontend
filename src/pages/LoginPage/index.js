/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {
  Container,
  Description,
  Formulario,
  ImageCustom,
  Layout,
  Title,
} from "./style";
import { X } from "react-feather";
import api, { socket } from "../../services/api";
// import history from "../../history";
import ModalMenu from "../../components/MenuModal";
import ErrorModal from "../../components/ErrorModal";
import BackdropComponent from "../../components/BackdropComponent";
import { useLocation } from "react-router-dom";
import { login } from "../../services/auth";
import LoginImage from "../../assets/login-v2.72cd8a26.svg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: 0,
    width: "100%",
    height: "100%",
  },
}));

export default function NewSessionPage() {
  const classes = useStyles();
  const [open] = useState(true);
  //   const [session, setSession] = useState("");
  //   const [token, setToken] = useState("");

  const [sessionToken, setSessionToken] = useState({ session: "", token: "" });

  const [qrCode, setQrCode] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const animationRef = useRef(null);
  //   const layoutRef = useRef(null);
  const [user, setUser] = useState("");

  const { state: haveLogin } = useLocation();

  const history = useHistory();

  useEffect(() => {
    api
      .post(`${window.IP_SERVER}mySession/THISISMYSECURETOKEN/generate-token`)
      .then(({ data }) => {
        if (data.session && data.token) {
          setSessionToken({
            session: data.session,
            token: data.token,
          });
          //   setToken(data.token);
          //   setSession(data.session);
        }
      });
  }, []);

  useEffect(() => {
    socket.on("qrCode", (qrCode) => {
      if (sessionToken.session === qrCode.session) {
        setQrCode(qrCode.data);
        // handleCloseBackdrop();
        // if (animationRef.current !== null) {
        //   animationRef.current.classList.remove("animation");
        // }
      }
      console.log("qrcode", qrCode);
    });

    socket.off("session-logged").on("session-logged", (status) => {
      if (status.session === sessionToken.session) {
        if (sessionToken.token) {
          insertLocalStorage();

          setTimeout(() => {
            history.push("/chat");
          }, 1000);
        }
      }
    });
  }, [sessionToken]);

  async function submitSession() {
    // e.preventDefault();

    if (sessionToken.session === "") {
      handleOpenErrorModal();
      setTitleError("Moiô");
      setErrorMessage("Dá um f5 aê.");
    } else {
      // handleToggleBackdrop();
      await startSession();
    }
  }

  function insertLocalStorage() {
    login(
      JSON.stringify({
        session: sessionToken.session,
        token: sessionToken.token,
        user,
      })
    );
  }

  async function startSession() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${sessionToken.token}` },
      };

      const checkConn = await api.get(
        `${sessionToken.session}/check-connection-session`,
        config
      );
      if (!checkConn.data.status) {
        await signSession();
      } else {
        insertLocalStorage();
        history.push("/chat");
      }
    } catch (e) {
      setTimeout(function () {
        handleCloseBackdrop();
        handleOpenErrorModal();
        setTitleError("Oops... Algo deu errado.");
        setErrorMessage("Verifique se a sessão e o token estão corretos.");
      }, 2000);
    }
  }

  async function signSession() {
    const config = {
      headers: { Authorization: `Bearer ${sessionToken.token}` },
    };

    await api.post(
      `${sessionToken.session}/start-session`,
      { waitQrCode: true },
      config
    );
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const handleCloseModal = () => {
    setOpenMenuModal(false);
  };

  const handleOpenModal = () => {
    setOpenMenuModal(true);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Layout className={classes.paper}>
            <ModalMenu handleClose={handleCloseModal} open={openMenuModal} />
            <ErrorModal
              handleClose={handleCloseErrorModal}
              open={openErrorModal}
              errorMessage={errorMessage}
              titleError={titleError}
            />
            <BackdropComponent open={openBackdrop} />

            {haveLogin !== undefined ? (
              <div className={"close-item"} onClick={() => history.goBack()}>
                <X />
              </div>
            ) : null}

            <Container>
              <div className={"container-session"}>
                <div>
                  {qrCode === "" ? null : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ImageCustom
                        ref={animationRef}
                        className={"animation noselect"}
                        autoplay
                        src={qrCode}
                        alt={"Smartphone"}
                        draggable={"false"}
                      />
                      <Title>Scan QRCode</Title>
                    </div>
                  )}

                  {qrCode !== "" ? null : (
                    <Formulario>
                      <InputLabel id="demo-simple-select-label">
                        {!user && 'Usuário'}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      >
                        <MenuItem value={"Tom Silva"}>Tom Silva</MenuItem>
                        <MenuItem value={"Henrique"}>Henrique</MenuItem>
                        <MenuItem value={"Guilherme"}>Guilherme</MenuItem>
                        <MenuItem value={"Gustavo"}>Gustavo</MenuItem>
                        <MenuItem value={"Jhony"}>Jhony</MenuItem>
                        <MenuItem value={"Vinicius"}>Vinicius</MenuItem>
                      </Select>

                      <button
                        type="submit"
                        id="send-btn"
                        disabled={!user}
                        onClick={() => submitSession()}
                      >
                        Entrar
                      </button>
                    </Formulario>
                  )}
                </div>
              </div>
            </Container>
          </Layout>
        </Fade>
      </Modal>
    </div>
  );
}
