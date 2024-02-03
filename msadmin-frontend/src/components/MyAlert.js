import React from 'react';
import {Alert} from "@mui/material";

const MyAlert = (severity, message) => {
    return (
        <Alert severity={severity}>{message}</Alert>
    )
}

export default MyAlert;
