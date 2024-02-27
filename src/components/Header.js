import * as React from "react";
 
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
 
function Header({title}) {
    return (
        <AppBar sx={{ backgroundColor: '#9518C0' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header
