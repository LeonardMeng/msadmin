import {useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';

import {connect} from "react-redux";
import {getUserMenu} from "../../utils/user";

// const CustomMenu = (menuList) => {
//     const theme = useTheme();
//     if (menuList === undefined) return;
//     if(menuList.menuList.length === 0) return;
//     const colors = tokens(theme.palette.mode);
//     console.log(menuList.menuList)
//     return (
//         <div>
//             {menuList.map((item) => (
//                     <Typography
//                         key={item.id}
//                         variant="h6"
//                         color={colors.grey[300]}
//                         sx={{m: "15px 0 5px 20px"}}
//                     >
//                         {item.name}
//                     </Typography>
//             ))}
//         </div>
//
//     )
//
// }
// const CustomMenu = ({ menuList }) => { // Correctly destructure menuList from props
//     const theme = useTheme();
//     if (!menuList || menuList.length === 0) return null; // Simplified check for menuList
//     const colors = tokens(theme.palette.mode);
//     console.log(menuList);
//     debugger
//     menuList.map((item) => (
//         console.log(item))
//     )
//     return (
//         <div>
//             {menuList.map((item) => (
//                 <Typography
//                     key={item.id}
//                     variant="h6"
//                     color={colors.grey[300]}
//                     sx={{ m: "15px 0 5px 20px" }}
//                 >
//                     {item.name}11111
//                 </Typography>
//             ))}
//         </div>
//     );
// };

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const RenderMenu = ({items, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const iconMap = {
        "<PeopleOutlinedIcon/>": <PeopleOutlinedIcon />,
        "<ContactsOutlinedIcon/>": <ContactsOutlinedIcon />,
        "<MenuBookOutlinedIcon/>": <MenuBookOutlinedIcon />,
        "<DomainOutlinedIcon/>": <DomainOutlinedIcon />,
        "<StorageOutlinedIcon/>": <StorageOutlinedIcon />,
    };
    return items.map((item) => (
        <div key={item.id}>
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{m: '15px 0 5px 20px'}}
            >
                {item.name}
            </Typography>
            {item.children.length > 0 && (<div>
                    {item.children.map((child) => (
                        // <Item items={item.children} setSelected={setSelected} selected={selected}/>
                        <Item
                            key={child.id}
                            title={child.name}
                            to={child.path}
                            icon={iconMap[child.icon]}
                            selected={selected}
                            setSelected={setSelected}/>
                    ))}
            </div>

            )}
        </div>
    ))
}

const Sidebar = (props) => {
    const {
        userInfo
    } = props
    const menuList = getUserMenu();
    // console.log(menuList)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/IMG_9538.JPG`}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{m: "10px 0 0 0"}}
                                >
                                    {userInfo.username}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {userInfo.roles}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <RenderMenu items={menuList} selected={selected} setSelected={setSelected} />
                    {/*    {menuList.map((item) => (*/}
                    {/*        <Typography*/}
                    {/*            key={item.id}*/}
                    {/*            variant="h6"*/}
                    {/*            color={colors.grey[300]}*/}
                    {/*            sx={{m: "15px 0 5px 20px"}}*/}
                    {/*        >*/}
                    {/*            {item.name}*/}
                    {/*        </Typography>*/}
                    {/*    {item.children && (*/}
                    {/*        <Item items={item.children} setSelected={setSelected} selected={selected}/>*/}

                    {/*)}*/}
                    {/*))}*/}
                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                    >
                        Data
                    </Typography>
                    <Item
                        title="Manage User"
                        to="/userManagement"
                        icon={<PeopleOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Contacts Information"
                        to="/contacts"
                        icon={<ContactsOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Invoices Balances"
                        to="/invoices"
                        icon={<ReceiptOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                    >
                        Pages
                    </Typography>
                    <Item
                        title="Profile Form"
                        to="/form"
                        icon={<PersonOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Calendar"
                        to="/calendar"
                        icon={<CalendarTodayOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="FAQ Page"
                        to="/faq"
                        icon={<HelpOutlineOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                    >
                        Charts
                    </Typography>
                    <Item
                        title="Bar Chart"
                        to="/bar"
                        icon={<BarChartOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Pie Chart"
                        to="/pie"
                        icon={<PieChartOutlineOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Line Chart"
                        to="/line"
                        icon={<TimelineOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Geography Chart"
                        to="/geography"
                        icon={<MapOutlinedIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
        </Box>
</Menu>
</ProSidebar>
</Box>
)
    ;
};

export default connect(
    state => ({
        userInfo: state.userInfo
    }), {})(Sidebar);

