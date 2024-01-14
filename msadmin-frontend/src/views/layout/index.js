import {ColorModeContext, useMode} from "../../theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {Outlet} from "react-router-dom";


/**
 * Created by KanadeM on 13/1/2024
 */
export default function Layout() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar/>
                    <main className="content">
                        <Topbar/>
                        <Outlet/>

                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

