import {Component, Fragment} from "react";
import {
    Avatar, Box, Button, Container,
    Divider, Fab, FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, Switch,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import AppToolbar from "./AppToolbar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {retrieveUsers} from '../actions/users';

class Users extends Component {

    constructor(props) {
        super(props);

        this.onShowDisabled = this.onShowDisabled.bind(this);
    }

    componentDidMount() {
        this.props.retrieveUsers({active: true});
    }

    onShowDisabled(event) {
        const {target} = event;
        this.props.retrieveUsers({active: !target.checked});
    }

    render() {
        const users = this.props.users.map(user => {

            const url = `/${user._id}`,
                userInitials = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`,
                userName = `${user.firstname} ${user.lastname}`,
                userEntry = `Tot. Entries: ${user.entries}`,
                isActive = user.active;

            return (
                <Fragment key={user._id}>
                    <ListItem alignItems="flex-start" component={Link} to={url}>
                        <ListItemAvatar>
                            <Avatar variant={isActive ? 'circular' : 'square'}>{userInitials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className="User-text"
                            primary={userName}
                            primaryTypographyProps={isActive ? null : {fontStyle: "italic"}}
                            secondary={userEntry}
                            secondaryTypographyProps={isActive ? null : {fontStyle: "italic"}}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Fragment>
            );
        });

        return (
            <Fragment>
                <AppToolbar title="Users"
                            action={<FormControlLabel
                                control={<Switch color="default" onClick={this.onShowDisabled}/>}
                                label="Show disabled"
                                labelPlacement="start"
                            />}/>
                <List className="Users-list">
                    {users}
                </List>
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Fab color="primary" aria-label="add" href="/new-user">
                        <AddIcon/>
                    </Fab>
                </Stack>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps, {retrieveUsers})(Users);
