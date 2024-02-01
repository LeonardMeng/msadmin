import {ColorModeContext, useMode} from "../../theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {Outlet} from "react-router-dom";
import {connect} from "react-redux";



/**
 * Created by KanadeM on 13/1/2024
 */
const Layout = (props) => {
    const {
        userSettings
    } = props;
    const [theme, colorMode] = useMode(userSettings.theme);
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

export default connect(
    state => ({
        userSettings: state.userSettings
    }), {

    })(Layout)

