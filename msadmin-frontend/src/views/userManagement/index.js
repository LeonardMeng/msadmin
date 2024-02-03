/**
 * Created by KanadeM on 13/1/2024
 */
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useTheme
} from "@mui/material";
import {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
//import {mockDataTeam} from "../../data/mockData";
import Header from "../../components/Header";
import {getAllUsers} from "../../api/user";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const UserManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userData, setUserData] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [selectedUserInfo, setselectedUserInfo] = useState({});

    const handleUserDialogOpen = (row, edit) => {
        setselectedUserInfo({
            username: row.username,
            email: row.email,
            phonenumber: row.phonenumber,
        })
        setIsEdit(edit);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setselectedUserInfo({})
        setDialogOpen(false);
    };
    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "roles",
            headerName: "Roles",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phonenumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Operations",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="left"
                        // backgroundColor={
                        //     access === "admin"
                        //         ? colors.greenAccent[600]
                        //         : access === "manager"
                        //             ? colors.greenAccent[700]
                        //             : colors.greenAccent[700]
                        // }
                        borderRadius="4px"
                    >
                        <Button variant="contained" color="success"
                                onClick={() => handleUserDialogOpen(params.row, false)}>View</Button>
                        <Button variant="contained" color="success" sx={{ml: "5px"}}
                                onClick={() => handleUserDialogOpen(params.row, true)}>Edit</Button>
                        <Button variant="contained" color="error" sx={{ml: "5px"}}>Delete</Button>
                        {/*{access === "admin" && <AdminPanelSettingsOutlinedIcon/>}*/}
                        {/*{access === "manager" && <SecurityOutlinedIcon/>}*/}
                        {/*{access === "user" && <LockOpenOutlinedIcon/>}*/}
                        {/*<Typography color={colors.grey[100]} sx={{ml: "5px"}}>*/}
                        {/*    {access}*/}
                        {/*</Typography>*/}
                    </Box>
                );
            },
        },
    ];

    useEffect(() => {
        getAllUsers().then((data) => {
                setUserData(data.userList)
            }
        ).catch(

        )
    }, [])
    return (
        <Box m="20px">
            <Header title="User Management" subtitle="Managing the Team Members"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid rows={userData} columns={columns}/>
                {/*<DataGrid checkboxSelection rows={mockDataTeam} columns={columns}/>*/}
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleDialogClose();
                        },
                    }}
                >
                    <DialogTitle>User Detail</DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText>*/}
                        {/*    To subscribe to this website, please enter your email address here. We*/}
                        {/*    will send updates occasionally.*/}
                        {/*</DialogContentText>*/}
                        <TextField
                            sx={{ml: "5px", mt: "10px"}}
                            id="outlined-read-only-input"
                            label="Username"
                            defaultValue={selectedUserInfo.username}
                            InputProps={{
                                readOnly: !isEdit,
                            }}
                        />
                        <TextField
                            sx={{ml: "5px", mt: "10px"}}
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue={selectedUserInfo.email}
                            InputProps={{
                                readOnly: !isEdit,
                            }}
                        />
                        <TextField
                            sx={{ml: "5px", mt: "10px"}}
                            id="outlined-read-only-input"
                            label="Phone Number"
                            defaultValue={selectedUserInfo.phonenumber}
                            InputProps={{
                                readOnly: !isEdit,
                            }}
                        />
                        {/*<TextField*/}
                        {/*    autoFocus*/}
                        {/*    required*/}
                        {/*    margin="dense"*/}
                        {/*    id="name"*/}
                        {/*    name="email"*/}
                        {/*    label="Email Address"*/}
                        {/*    type="email"*/}
                        {/*    fullWidth*/}
                        {/*    variant="standard"*/}
                        {/*/>*/}
                    </DialogContent>
                    {isEdit &&
                        <DialogActions>
                            <Button onClick={handleDialogClose}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>}

                </Dialog>
            </Box>
        </Box>
    );
};

export default UserManagement;
