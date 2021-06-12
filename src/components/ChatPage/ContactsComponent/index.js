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
