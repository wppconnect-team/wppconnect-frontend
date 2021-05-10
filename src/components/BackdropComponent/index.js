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
                    <Image src={HandOk} alt={"Wait for QRCode"} />
                    <h1>
                        Aguarde alguns segundos...
                    </h1>
                </Layout>
            </Backdrop>
        </div>
    );
}

BackdropComponent.propTypes = {
    open: PropTypes.bool.isRequired,
};