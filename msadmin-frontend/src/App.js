
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";

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

const mainRouter = createBrowserRouter([
    {path: '/login', element: <Login/>},
    {path: '/signUp', element: <SignUp/>},
    {
        path: '/', element: <Layout/>, children: [
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/userManagement', element: <UserManagement/>},
            {path: '/contacts', element: <Contacts/>},
            {path: '/invoices', element: <Invoices/>},
            {path: '/geography', element: <Geography/>}
        ]
    },{
        path: '*', element: <Error404/>
    }
])

function App() {

    // const [theme, colorMode] = useMode();
    return (
        <React.StrictMode>
            <RouterProvider store={store} router={mainRouter}/>
        </React.StrictMode>
)}


export default App;
