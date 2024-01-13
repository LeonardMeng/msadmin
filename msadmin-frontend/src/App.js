// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar  from "./views/components/Topbar";
import Dashboard from "./views/dashboard";
import Sidebar from "./views/components/Sidebar";
import UserManagement from "./views/userManagement";
import Contacts from "./views/contacts";
import Invoices from "./views/invoices";
function App() {
  const [theme, colorMode] = useMode();
  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
              <Sidebar/>
              <main className="content">
                  <Topbar/>
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/userManagement" element={<UserManagement />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/invoices" element={<Invoices />} />
                  </Routes>
              </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
