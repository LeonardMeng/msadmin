// import { useState } from "react";
import {Routes, Route} from "react-router-dom";
// import {useMode} from "./theme";
import Dashboard from "./views/dashboard";
import UserManagement from "./views/userManagement";
import Contacts from "./views/contacts";
import Invoices from "./views/invoices";
import Geography from "./views/geography";
import Layout from "./views/layout";

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

function App() {
    // const [theme, colorMode] = useMode();
    return (

        <Routes>
            <Route path="/login" element={<Geography/>}/>
            <Route path="/" element={<Layout/>}>

                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/userManagement" element={<UserManagement/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/invoices" element={<Invoices/>}/>
                <Route path="/geography" element={<Geography/>}/>

            </Route>
        </Routes>)


    // );
}

export default App;
