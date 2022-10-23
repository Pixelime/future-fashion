import {Component, Fragment} from "react";
import {
    Avatar, Divider, Fab, List, ListItem, ListItemAvatar, ListItemText, Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import AppToolbar from "./AppToolbar";
import UsersFilters from "./UsersFilters";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {retrieveUsers} from '../actions/users';

class Users extends Component {

    componentDidMount() {
        this.props.retrieveUsers(this.props.filters);
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
                <AppToolbar title="Users" action={<UsersFilters/>}/>
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
        filters: state.filters
    };
};

export default connect(mapStateToProps, {retrieveUsers})(Users);
