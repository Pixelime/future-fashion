import {Component, Fragment} from "react";
import {
    Avatar, Box, Container,
    Divider, Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import AppToolbar from "./AppToolbar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {retrieveUsers} from '../actions/users';

class Users extends Component {

    componentDidMount() {
        this.props.retrieveUsers();
    }

    render() {
        const users = this.props.users.map(user => {

            const url = `/${user._id}`,
                userInitials = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`,
                userName = `${user.firstname} ${user.lastname}`,
                userEntry = `Tot. Entries: ${user.entries}`;

            return (
                <Fragment key={user._id}>
                    <ListItem className="User-link" alignItems="flex-start" component={Link} to={url}>
                        <ListItemAvatar>
                            <Avatar className="User-avatar">{userInitials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText className="User-text" primary={userName} secondary={userEntry}/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Fragment>
            );
        });

        return (
            <Fragment>
                <AppToolbar title="Users"/>
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
