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