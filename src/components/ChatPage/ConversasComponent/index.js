import React, {useEffect} from "react";
import {ContactInfo, Layout, SearchComponent, UserData} from "./style";
import {Search} from "react-feather";
import PropTypes from "prop-types";
import {listenerMessages} from "../../../services/socket-listener";

const defaultImage = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ConversasComponent = ({chats, setChats, onSearch, onClickContact}) => {
    useEffect(() => {
        listenerMessages((err, data) => {
            if (err) return;

            const newList = [];
            const filteredList = chats.filter((filtro) => filtro.id !== data.response.chatId);

            newList.unshift([...filteredList, data.response]);
            setChats(newList);
        });
    }, [chats]);

    const onChangeContact = () => {
        const elContactsMain = document.querySelector("#all-contacts");
        const contacts = elContactsMain.querySelectorAll(".contact-li");

        for (const user of contacts) {
            user.addEventListener("click", function () {
                const current = document.getElementsByClassName("active");

                if (current.length > 0) {
                    current[0].classList.remove("active");
                }

                this.classList.add("active");
            })
        }
    }


    return (
        <Layout>
            <SearchComponent style={{marginBottom: 0}}>
                <Search/> <input placeholder={"Search for a contact"} onChange={(e) => onSearch(e)}/>
            </SearchComponent>

            <ul id={"all-contacts"} onClick={() => onChangeContact()}>
                {
                    chats.length > 0 ? (
                        chats.map((contact, index) => {
                            return (
                                <li className={"contact-li"} key={index} onClick={() => onClickContact(contact)}>
                                    <ContactInfo>
                                        <input
                                            type={"radio"}
                                            name={"contact"}
                                        />

                                        <UserData>
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${contact.name}?background=random`}
                                                alt={`${contact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png"}
                                            />
                                            <div className={"principal-info"}>
                                                <small className={"contact-name"}>
                                                    {contact.name === undefined ? contact.id.replace("@c.us", "").replace("@g.us", "") : contact.name}
                                                    {/*{contact.id.user}*/}
                                                </small>
                                                <div className={"contact-message"}>
                                                    {/*{contact.msgs}*/}
                                                    <p className={"left"}>
                                                        {contact.msgs[contact.msgs.length - 1].body === undefined ? "Não foi possível carregar as mensagens anteriores..." : contact.msgs[contact.msgs.length - 1].body}
                                                    </p>

                                                    {contact.unreadCount !== 0 && <div className={"unread-message"}/>}
                                                </div>
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
    chats: PropTypes.any.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClickContact: PropTypes.func.isRequired,
};

export default ConversasComponent;