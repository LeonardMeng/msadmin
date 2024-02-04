import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useEffect} from "react";

import Dashboard from "./views/dashboard";
import UserManagement from "./views/userManagement";
import Contacts from "./views/contacts";
import Invoices from "./views/invoices";
import Geography from "./views/geography";
import Layout from "./views/layout";
import Login from "./views/login";
import SignUp from "./views/signup";
import Error404 from "./views/errorPages/404";
import store from "./store";
import {connect} from "react-redux";
import {setUserInfo, setUserToken} from "./store/actions/actions";
import {getUserMenu} from "./utils/user";
import AuthWrapper from "./utils/AuthWrapper";

// import {Login} from "./views/login";

// const MainRouter = createBrowserRouter(
//     {path: '/', component: Geography},
//     {
//         path: '/admin', component: Layout, children: [
//             {path: '/dashboard', component: Dashboard},
//             {path: '/userManagement', component: UserManagement},
//             {path: '/contacts', component: Contacts},
//             {path: '/invoices', component: Invoices},
//             {path: '/geography', component: Geography}
//         ]
//     },
// )
const componentMapping = {
    '/dashboard': Dashboard,
    '/userManagement': UserManagement,
    '/contacts': Contacts,
    '/invoices': Invoices,
    '/geography': Geography,
};

const baseRouter = createBrowserRouter([
    {path: '/login', element: <Login/>},
    {path: '/signUp', element: <SignUp/>},
    {
        path: '/', element: <Layout/>, children: [
            {path: '/dashboard', element: <Dashboard/>}
        ]
    }, {
        path: '*', element: <Error404/>
    }
])

const generateRoutesFromMenuList = (menuList) => {
    const childRoutes = [];

    menuList.forEach(menu => {
        if (menu.menuType === 'M' && menu.children) {
            menu.children.forEach(subMenu => {
                if (subMenu.menuType === 'C' && componentMapping[subMenu.path]) {
                    childRoutes.push({
                        path: subMenu.path,
                        element: React.createElement(componentMapping[subMenu.path]),
                    });
                }
            });
        }
    });

    return childRoutes;
};

const App = (props) => {
    const {userToken} = props;
    const [routes, setRoutes] = React.useState(baseRouter);
    useEffect(() => {
        const menuList = getUserMenu()
        const childrenRoutes = generateRoutesFromMenuList(menuList);
        childrenRoutes.push({path: '/dashboard', element: <Dashboard/>})

        const mainRouter = createBrowserRouter([
            {path: '/login', element: <Login/>},
            {path: '/signUp', element: <SignUp/>},
            {
                path: '/',
                element: <AuthWrapper><Layout /></AuthWrapper>,
                children: childrenRoutes,
            },
            {path: '*', element: <Error404/>},
        ]);
        if (childrenRoutes.length > 0) {
            setRoutes(mainRouter)
        }
        return () => {

        };
    }, [userToken]);


    // const [theme, colorMode] = useMode();
    return (
        // <React.StrictMode>
        <RouterProvider store={store} router={routes}/>
        // </React.StrictMode>
    )
}


export default connect(
    state => ({
        userToken: state.userToken,
    }), {})(App);
