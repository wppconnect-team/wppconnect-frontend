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
import {Buttons, Container, Layout, Link, LogoWPP} from "./style";
import {GitHub} from "react-feather";

const Header = () => {
    return (
        <Layout>
            <Container>
                <LogoWPP>
                    WPP<b>Connect</b> <small>(MultiSession)</small>
                </LogoWPP>

                <Buttons>
                    <ul className="secondary-nav">
                        <li>
                            <Link href="https://github.com/wppconnect-team/wppconnect"
                                  target={"_blank"}
                            >
                                <GitHub/>
                                Github
                            </Link>
                        </li>

                        <li>
                            <Link href="https://wppconnect-team.github.io/wppconnect/"
                                  target={"_blank"}>Documentation</Link>
                        </li>
                    </ul>
                </Buttons>
            </Container>
        </Layout>
    );
};

export default Header;