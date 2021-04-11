import React, {useState} from "react";
import {BottomItems, ChangeSession, Container, InfoSession, Layout, MenuItems} from "./style";
import {NavLink} from "react-router-dom";
import {BarChart, MessageCircle, Settings, User} from "react-feather";
import ChangeSessionDialog from "../ChangeSession";
import {getSession} from "../../services/auth";

const Sidebar = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState(getSession());

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = (value) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };

    const handleClickDisabled = (e) => {
        e.preventDefault();
    };


    return (
        <Layout>
            <ChangeSessionDialog
                handleClose={handleClose}
                open={openDialog}
                selectedValue={selectedValue}
            />

            <Container>
                <MenuItems>
                    <li>
                        <NavLink to={"chat"} activeClassName={"selected"}>
                            <MessageCircle/> Conversas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"contatos"} activeClassName={"selected"}>
                            <User/> Contatos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={"relatorio"}
                            activeClassName={"selected"}
                            onClick={(e) => handleClickDisabled(e)}
                            className={"disabled"}
                        >
                            <BarChart/> Relatórios
                        </NavLink>
                    </li>
 
                    <li>
                        <NavLink
                            to={"configuracoes"}
                            activeClassName={"selected"}
                            onClick={(e) => handleClickDisabled(e)}
                            className={"disabled"}>
                            <Settings/> Configurações
                        </NavLink>
                    </li>
                </MenuItems>

                <BottomItems>
                    <ChangeSession>
                        <div>
                            <div className={"online-circle"}/>
                            <p>
                                Online
                            </p>
                        </div>

                        <div>
                            <a href={"/change-session"} onClick={(e) => {
                                e.preventDefault();
                                handleClickOpen();
                            }}>
                                Alterar
                            </a>
                        </div>
                    </ChangeSession>

                    <InfoSession>
                        <img src={`https://ui-avatars.com/api/?name=${getSession()}?background=random`} alt={"ProfileUser"}/>
                        <div>
                            <p>
                                {selectedValue}
                            </p>
                            <small>
                                Sessão ativa
                            </small>
                        </div>
                    </InfoSession>
                </BottomItems>
            </Container>
        </Layout>
    );
};

export default Sidebar;
