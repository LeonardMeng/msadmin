/**
 * Created by KanadeM on 13/1/2024
 */
import * as React from 'react';
import {Badge, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { logout} from "../../api/sso";
import { connect } from "react-redux";
import {removeToken} from "../../utils/auth";
import {useNavigate} from "react-router-dom";
import {removeUserToken} from "../../store/actions/actions";

const Topbar = (props) => {
    const {
        token,
        removeUserToken,
    } = props;
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null)
        removeUserToken()
        removeToken()
        logout().then((data) => {
            console.log(data)
        }).catch((error) => {

        });
        return navigate("/login");
    }

    const handlGetToken = () => {
        console.log(token)
        setAnchorEl(null)

    }


    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Box display="flex" justifyContent="space-between" p={2}>
                {/* SEARCH BAR */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
                    <IconButton type="button" sx={{p: 1}}>
                        <SearchIcon/>
                    </IconButton>
                </Box>

                {/* ICONS */}
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlinedIcon/>
                        ) : (
                            <LightModeOutlinedIcon/>
                        )}
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="success">
                            <NotificationsOutlinedIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <SettingsOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <PersonOutlinedIcon/>
                    </IconButton>
                </Box>

            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar/> Profile
                </MenuItem>
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <Avatar/> My account*/}
                {/*</MenuItem>*/}
                {/*<Divider/>*/}
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <PersonAdd fontSize="small"/>*/}
                {/*    </ListItemIcon>*/}
                {/*    Add another account*/}
                {/*</MenuItem>*/}
                <MenuItem onClick={handlGetToken}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <Box
                role="presentation">
                <Drawer
                    PaperProps={{
                        sx: { width: "250px" },
                    }}
                    anchor='right'
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onOpen={() => setIsDrawerOpen(true)}
                >
                    <List>
                        <ListItem key="inbox" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Inbox"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>


            </Box>

        </React.Fragment>
    );
};

export default connect(
    state => ({
        token: state.userToekn
    }),{removeUserToken}
    )(Topbar);
