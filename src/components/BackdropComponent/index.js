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
import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import HandOk from "../../assets/hand-ok.png";
import { Image, Layout } from "./style";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backdropFilter: "blur(15px)"
    },
}));

export default function BackdropComponent({ open }) {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <Layout>
                    <h1>
                        Please wait...
                    </h1>
                </Layout>
            </Backdrop>
        </div>
    );
}

BackdropComponent.propTypes = {
    open: PropTypes.bool.isRequired,
};