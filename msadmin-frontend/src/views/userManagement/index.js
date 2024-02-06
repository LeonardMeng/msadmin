/**
 * Created by KanadeM on 13/1/2024
 */
import {
    Badge,
    Box, IconButton,
    useTheme
} from "@mui/material";
import {useEffect, useRef, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
//import {mockDataTeam} from "../../data/mockData";
import Header from "../../components/Header";
import {getAllUsers, queryUsers} from "../../api/user";
import Button from "@mui/material/Button";
import ViewDialog from "./components/ViewDialog";
import AddUserDialog from "./components/AddUserDialog";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import * as React from "react";
import {Pagination} from "antd";
import {login} from "../../api/sso";


const UserManagement = () => {
    const theme = useTheme();

    const [query, setQuery] = useState({
        query: '',
        pageNum: 1,
        pageSize: 10
    });
    const searchInputRef = useRef(null);
    const colors = tokens(theme.palette.mode);
    const [userData, setUserData] = useState([])
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [selectedUserInfo, setSelectedUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rowCountState, setRowCountState] = useState(userData.length);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    })

    const handleViewDialogOpen = (row, edit) => {
        setSelectedUserInfo({
            username: row.username,
            email: row.email,
            phonenumber: row.phonenumber,
        })
        setIsEdit(edit);
        setViewDialogOpen(true);
    };

    const handleNewDialogOpen = () => {
        setNewDialogOpen(true);
    }
    const handleViewDialogClose = () => {
        setSelectedUserInfo({})
        setViewDialogOpen(false);
    };


    const handleNewDialogClose = () => {
        setNewDialogOpen(false);
    };

    const handleUserQuery = (event) => {
        // console.log(query)
        const inputValue = searchInputRef.current.value;
        setQuery({
            ...query,
            query: inputValue
        })
        // console.log(query)
        // queryUsers(query).then((data) => {
        //     console.log(data)
        //     setRowCountState(data.total)
        //     setUserData(data.userList)
        //     setQuery({
        //         ...query,
        //         pageNum: 1,
        //         pageSize: 10
        //     })
        // }).catch((error) => {
        // });
    }

    const handlePageChange = (event) => {
        setQuery({
            ...query,
            pageNum: event.page + 1,
            pageSize: event.pageSize
        })
    }

    useEffect(() => {
        queryUsers(query).then((data) => {
            setUserData(data.userList)
            setRowCountState(data.total)
            setPaginationModel({
                page: query.pageNum - 1,
                pageSize: query.pageSize
            })

        }).catch((error) => {
                console.log(error)
            }
        )
    }, [query])

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
                                onClick={() => handleViewDialogOpen(params.row, false)}>View</Button>
                        <Button variant="contained" color="success" sx={{ml: "5px"}}
                                onClick={() => handleViewDialogOpen(params.row, true)}>Edit</Button>
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
                <Box display="flex" justifyContent="space-between" p={2}>
                    {/* SEARCH BAR */}

                    <Button
                        sx={{ml: "5px", mb: "10px"}}
                        variant="contained" color="success"
                        onClick={() => handleNewDialogOpen({}, true)}>New</Button>
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px"

                    >
                        <InputBase
                            sx={{ml: 2, flex: 1}}
                            inputRef={searchInputRef}
                            placeholder="Search"/>
                        <IconButton type="button" sx={{p: 1}} onClick={handleUserQuery}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>


                </Box>


                <DataGrid
                    rows={userData}
                    columns={columns}
                    loading={isLoading}
                    rowCount={rowCountState}

                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePageChange}

                    pageSizeOptions={[5, 10, 15]}
                    paginationMode="server"
                />
                {/*<DataGrid checkboxSelection rows={mockDataTeam} columns={columns}/>*/}
                <ViewDialog open={viewDialogOpen} userInfo={selectedUserInfo} isEdit={isEdit}
                            handleClose={handleViewDialogClose}/>
                <AddUserDialog open={newDialogOpen} handleClose={handleNewDialogClose}/>

            </Box>

        </Box>
    );
};

export default UserManagement;
