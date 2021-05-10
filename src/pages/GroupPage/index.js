import React, {useEffect, useState} from "react";
import {Container, Layout, LeftContainer, RightContainer} from "./style";
import {HeaderComponent, TableContainer} from "../Contacts/style";
import api from "../../services/api";
import {getSession} from "../../services/auth";
import config from "../../util/sessionHeader";
import {DataGrid} from "@material-ui/data-grid";
import {UserPlus, FilePlus, ListOrdered, Bot} from "lucide-react";

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [, setSelected] = useState(1);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: "47.50%"
        },
        {
            field: "name",
            headerName: "Name",
            width: "47.50%"
        },
    ];

    useEffect(() => {
        async function getAllGroups() {
            const {data: allGroups} = await api.post(`${getSession()}/show-all-groups`, null, config);
            setGroups(allGroups.groups);
        }

        getAllGroups();

    }, []);

    return (
        <Layout>
            <Container>
                <LeftContainer>
                    <ul>
                        <li onClick={() => setSelected(1)}>
                            <div className={"wrapper-li"}>
                                <div className={"wrapper-ic"}>
                                    <ListOrdered/>
                                </div>
                                <div className={"wrapper-text"}>
                                    <h2>
                                        Todos os Grupos
                                    </h2>
                                    <p>
                                        Gerencie todos os seus grupos.
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li onClick={() => setSelected(1)}>
                            <div className={"wrapper-li"}>
                                <div className={"wrapper-ic"}>
                                    <FilePlus/>
                                </div>
                                <div className={"wrapper-text"}>
                                    <h2>
                                        Criar Grupo
                                    </h2>
                                    <p>
                                        Crie um grupo no WhatsApp de forma automatizada.
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li onClick={() => setSelected(2)}>
                            <div className={"wrapper-li"}>
                                <div className={"wrapper-ic"}>
                                    <UserPlus/>
                                </div>
                                <div className={"wrapper-text"}>
                                    <h2>
                                        Convidar Participantes
                                    </h2>
                                    <p>
                                        Convide participantes para os seus grupos rapidamente.
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li onClick={() => setSelected(3)}>
                            <div className={"wrapper-li"}>
                                <div className={"wrapper-ic"}>
                                    <Bot/>
                                </div>
                                <div className={"wrapper-text"}>
                                    <h2>
                                        Boas Vindas
                                    </h2>
                                    <p>
                                        Configure uma mensagem de boas vindas quando um usuário entrar em seu grupo.
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </LeftContainer>

                <RightContainer>
                    <HeaderComponent>
                        <h2>
                            Grupos
                        </h2>

                        <div>
                            <input placeholder={"Procurar grupo..."}/>
                        </div>
                    </HeaderComponent>

                    <TableContainer>
                        <DataGrid
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                            pageSize={15}
                            columns={columns}
                            rows={groups}
                        />
                    </TableContainer>
                </RightContainer>
            </Container>
        </Layout>
    );
};

export default GroupPage;
