import React, {useEffect, useState} from "react";
import {Container, Layout, LeftContainer, RightContainer} from "./style";
import {HeaderComponent, TableContainer} from "../Contacts/style";
import api from "../../services/api";
import {getSession} from "../../services/auth";
import config from "../../util/sessionHeader";
import {DataGrid} from "@material-ui/data-grid";
import {FilePlus, ListOrdered, UserPlus} from "lucide-react";
import ModalCreateGroup from "../../components/Group/CreateGroup";

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [, setSelected] = useState(1);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const handleOpenCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenModalCreate(false);
    };

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

    const rows = groups.map((grupo, index) => {
        return {
            key: index,
            id: grupo.id._serialized,
            name: grupo.name,
        };
    });

    useEffect(() => {
        async function getAllGroups() {
            const {data: allGroups} = await api.get(`${getSession()}/all-groups`, config);
            setGroups(allGroups.response);
        }

        getAllGroups();

    }, []);

    return (
        <Layout>
            <ModalCreateGroup handleClose={handleCloseCreate} open={openModalCreate}/>
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

                        <li onClick={() => {
                            setSelected(1);
                            handleOpenCreate();
                        }}>
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
                            rows={rows}
                        />
                    </TableContainer>
                </RightContainer>
            </Container>
        </Layout>
    );
};

export default GroupPage;
