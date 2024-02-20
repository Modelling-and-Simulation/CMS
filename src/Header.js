import * as React from "react";
 
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
 
function Header() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#9518C0' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                    Content Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header
