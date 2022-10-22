import {Component, Fragment} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {retrieveUser, updateUser, deleteUser} from "../actions/users";
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";


class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                entries: 0,
                gender: 'M'
            }
        };

        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onSaveItem = this.onSaveItem.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this._getCurrentId = this._getCurrentId.bind(this);
    }

    _getCurrentId() {
        return this.props.params.id
    }

    async componentDidMount() {
        const user = await this.props.retrieveUser(this._getCurrentId());
        this.setState({user});
    }

    handleChange(event) {
        const {target} = event;
        this.setState({user: {...this.state.user, ...{[target.name]: target.value}}})
    }

    async onSaveItem() {
        await this.props.updateUser(this._getCurrentId(), this.state.user);
        this.props.navigate('/');
    }

    async onDeleteItem() {
        await this.props.deleteUser(this._getCurrentId());
        this.props.navigate('/');
    }

    render() {
        const user = this.state.user;

        return (
            <Box component="form" id="user-form">
                <FormControl fullWidth>
                    <TextField
                        id="firstname"
                        name="firstname"
                        label="Firstname"
                        variant="outlined"
                        required={true}
                        margin="normal"
                        value={user.firstname}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="lastname"
                        name="lastname"
                        label="Lastname"
                        variant="outlined"
                        required={true}
                        margin="normal"
                        value={user.lastname}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="entries"
                        name="entries"
                        label="Entries"
                        variant="outlined"
                        required={true}
                        type="number"
                        margin="normal"
                        value={user.entries}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-label">Age</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        label="Gender"
                        value={user.gender}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="F">Female</MenuItem>
                        <MenuItem value="M">Male</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                        <Button variant="outlined" color="error" onClick={this.onDeleteItem}>Delete</Button>
                        <Button variant="contained" onClick={this.onSaveItem}>Save</Button>
                    </Stack>
                </FormControl>
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

function withNavigate(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

export default connect(mapStateToProps, {retrieveUser, updateUser, deleteUser})(withNavigate(withParams(User)));
