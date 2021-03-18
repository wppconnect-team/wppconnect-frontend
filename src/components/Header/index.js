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