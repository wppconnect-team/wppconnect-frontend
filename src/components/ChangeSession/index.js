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
import React, {useEffect, useState} from "react";
import AllSessionsDialog from "./Dialog";
import api from "../../services/api";
import {getSession} from "../../services/auth";
import config from "../../util/sessionHeader";
import PropTypes from "prop-types";

function ChangeSessionDialog({open, handleClose, selectedValue}) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function getAllSessions() {
            const {data: {response}} = await api.get(`${getSession()}/show-all-sessions`, config());
            setSessions(response);
        }

        getAllSessions();
        return () => {
            setSessions([]);
        };
    }, []);

    return (
        <div>
            <AllSessionsDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                sessions={sessions}
            />
        </div>
    );
}

ChangeSessionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default ChangeSessionDialog;