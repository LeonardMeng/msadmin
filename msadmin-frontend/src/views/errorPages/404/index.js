/**
 * Created by KanadeM on 15/1/2024
 */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import Link from "@mui/material/Link";

const primary = purple[500]; // #f44336

export default function Error404() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained">
                <Link href="/dashboard">
                    Back to Home
                </Link>
            </Button>
        </Box>
    );
}
