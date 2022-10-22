import {Component} from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";


class AppToolbar extends Component {
    render() {
        return (
            <AppBar position={"static"}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {this.props.title}
                    </Typography>
                    {this.props.action || null}
                </Toolbar>
            </AppBar>
        );
    }
}

export default AppToolbar;
