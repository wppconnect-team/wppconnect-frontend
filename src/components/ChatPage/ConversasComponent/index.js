import React, {useEffect, useState} from "react";
import {ContactInfo, Layout, SearchComponent, UserData} from "./style";
import {Search} from "react-feather";
import PropTypes from "prop-types";

const defaultImage = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ConversasComponent = ({contacts, onClickContact}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(contacts);

        return () => {
            setData([]);
        };
    }, []);

    function searchChat(e) {
        let query = e.target.value;

        let users = contacts.filter((filtro) => {
                if (filtro.name !== undefined && filtro.id._serialized !== undefined) {
                    return filtro.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(query.toLowerCase()) > -1 || filtro.id._serialized.indexOf(query) > -1;
                } else {
                    return [];
                }
            }
        );

        setData(users);

        if (query === "") {
            setData(contacts);
        }
    }

    return (
        <Layout>
            <SearchComponent>
                <Search/> <input placeholder={"Procure um contato"} onChange={(e) => searchChat(e)}/>
            </SearchComponent>

            <h2>
                Conversas
            </h2>

            <ul>
                {
                    data.length > 0 ? (
                        data.map((contact, index) => {
                            return (
                                <li key={index} onClick={() => onClickContact(contact)}>
                                    <ContactInfo>
                                        <input
                                            type={"radio"}
                                            name={"contact"}
                                        />

                                        <UserData>
                                            <img
                                                src={contact.contact.profilePicThumbObj === undefined ? defaultImage : contact.contact.profilePicThumbObj.eurl === null ? `https://ui-avatars.com/api/?name=${contact.name}?background=random` : contact.contact.profilePicThumbObj.eurl}
                                                alt={`${contact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${contact.name}?background=random`}
                                            />
                                            <div className={"principal-info"}>
                                                <small className={"contact-phone"}>
                                                    {contact.id.user}
                                                </small>
                                                <p className={"contact-name"}>
                                                    {
                                                        contact.name === undefined ? contact.contact.formattedName : contact.name
                                                    }
                                                </p>
                                            </div>
                                        </UserData>
                                    </ContactInfo>
                                </li>
                            );
                        })
                    ) : null
                }
            </ul>
        </Layout>
    );
};

ConversasComponent.propTypes = {
    contacts: PropTypes.any.isRequired,
    onClickContact: PropTypes.func.isRequired,
};

export default ConversasComponent;