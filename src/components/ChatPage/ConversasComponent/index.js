import React from "react";
import {ContactInfo, Layout, SearchComponent, UserData} from "./style";
import {Search} from "react-feather";
import PropTypes from "prop-types";

const defaultImage = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ConversasComponent = ({chats, onSearch, onClickContact}) => {
    return (
        <Layout>
            <SearchComponent>
                <Search/> <input placeholder={"Procure um contato"} onChange={(e) => onSearch(e)}/>
            </SearchComponent>

            <h2>
                Conversas
            </h2>

            <ul>
                {
                    chats.length > 0 ? (
                        chats.map((contact, index) => {
                            return (
                                <li key={index} onClick={() => onClickContact(contact)}>
                                    <ContactInfo>
                                        <input
                                            type={"radio"}
                                            name={"contact"}
                                        />

                                        <UserData>
                                            <img
                                                src={contact.contact.profilePicThumbObj.eurl === undefined ? defaultImage : contact.contact.profilePicThumbObj.eurl === null ? `https://ui-avatars.com/api/?name=${contact.name}?background=random` : contact.contact.profilePicThumbObj.eurl}
                                                alt={`${contact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png"}
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
    chats: PropTypes.any.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClickContact: PropTypes.func.isRequired,
};

export default ConversasComponent;