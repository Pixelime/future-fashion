import {Component, Fragment} from "react";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
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
                // userEntry = `Tot. ${user.entries} - Last: 02/10/2022`;

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
                <List className="Users-list">
                    {users}
                </List>
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
