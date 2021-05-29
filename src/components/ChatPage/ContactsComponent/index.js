import React from 'react';
import {ContactInfo, Layout, UserData} from "./style";

const defaultImage = 'https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png'

const ContactsComponent = ({contacts, onClickContact}) => {
    return (
        <Layout>
            <h2>
                Contatos
            </h2>

            <ul>
                {
                    contacts.length > 0 ? (
                        contacts.map((contact, index) => {
                            return (
                                <li key={index} onClick={() => onClickContact(contact)}>
                                    <ContactInfo>
                                        <input
                                            type={"radio"}
                                            name={"contact"}
                                        />

                                        <UserData>
                                            <img
                                                src={contact.profilePicThumbObj.eurl === undefined ? defaultImage : contact.profilePicThumbObj.eurl}
                                                alt={`Photo of ${contact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = defaultImage}
                                            />
                                            <div className={"principal-info"}>
                                                <small className={"contact-phone"}>
                                                    {contact.id.user}
                                                </small>
                                                <p className={"contact-name"}>
                                                    {contact.name}
                                                </p>
                                            </div>
                                        </UserData>
                                    </ContactInfo>
                                </li>
                            )
                        })
                    ) : null
                }
            </ul>
        </Layout>
    );
};

export default ContactsComponent;
