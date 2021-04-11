import React, {useEffect, useState} from "react";
import {Container, HeaderComponent, Layout, TableContainer} from "./style";
import {DataGrid} from "@material-ui/data-grid";
import api from "../../services/api";
import {getSession} from "../../services/auth";
import config from "../../util/sessionHeader";

const ContactsPage = () => {
    const [data, setData] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts();

        return () => {
            setContacts([]);
        };
    }, []);

    async function getAllContacts() {
        const response = await api.get(`${getSession()}/show-all-contacts`, config);
        setContacts(response.data.response);
        setData(response.data.response);
    }

    const rows = contacts.map((contato, index) => {
        return {id: index, name: contato.name, phone: contato.id._serialized};
    });

    const columns = [
        {
            field: "id",
            headerName: "Id",
            width: "33%"
        },
        {
            field: "name",
            headerName: "Nome",
            width: "33%"
        },
        {
            field: "phone",
            headerName: "Telefone",
            width: "33%"
        },
    ];

    function searchContact(e) {
        let query = e.target.value;

        let users = data.filter((filtro) => {
                if (filtro.name !== undefined && filtro.id._serialized !== undefined) {
                    return filtro.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(query.toLowerCase()) > -1 || filtro.id._serialized.indexOf(query) > -1;
                } else {
                    return [];
                }
            }
        );

        setContacts(users);

        if (query === "") {
            setContacts(data);
        }
    }

    return (
        <Layout>
            <Container>
                <HeaderComponent>
                    <h2>
                        Contatos
                    </h2>

                    <div>
                        <input placeholder={"Procurar contato..."} onChange={(e) => searchContact(e)}/>
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
            </Container>
        </Layout>
    );
};

export default ContactsPage;
