import {Component, Fragment} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {retrieveUser, createUser, updateUser, deleteUser} from "../actions/users";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import AppToolbar from "./AppToolbar";

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                entries: 0,
                gender: 'M',
                active: true
            }
        };

        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onActivateItem = this.onActivateItem.bind(this);
        this.onSaveItem = this.onSaveItem.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this._getCurrentId = this._getCurrentId.bind(this);
    }

    _getCurrentId() {
        return this.props.isNew ? null : this.props.params.id;
    }

    async componentDidMount() {
        if (!this.props.isNew) {
            const user = await this.props.retrieveUser(this._getCurrentId());
            this.setState({user});
        }
    }

    handleChange(event) {
        const {target} = event;
        this.setState({user: {...this.state.user, ...{[target.name]: target.value}}})
    }

    async onSaveItem() {
        const userData = this.state.user;
        await this.props.isNew ?
            this.props.createUser(userData) :
            this.props.updateUser(this._getCurrentId(), userData);

        this.props.navigate('/');
    }

    async onDeleteItem() {
        if (this.props.isNew) {
            return;
        }
        await this.props.deleteUser(this._getCurrentId());
        this.props.navigate('/');
    }

    async onActivateItem(){
        if (this.props.isNew) {
            return;
        }
        await this.props.updateUser(this._getCurrentId(), {active: true});
        this.props.navigate('/');
    }

    render() {
        const user = this.state.user,
            isNew = this.props.isNew;

        return (
            <Fragment>
                <AppToolbar title={isNew ? `New User` : `User - ${user.firstname} ${user.lastname}`}/>
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
                        <FormControlLabel disabled control={<Checkbox id="active" name="active" checked={user.active} />} label="Active" />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                            {
                                isNew ? null :
                                    user.active ?
                                        <Button variant="outlined" color="error" onClick={this.onDeleteItem}>Delete</Button> :
                                        <Button variant="outlined" color="success" onClick={this.onActivateItem}>Activate</Button>
                            }
                            <Button variant="contained" onClick={this.onSaveItem}>Save</Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Fragment>
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

export default connect(mapStateToProps, {retrieveUser, createUser, updateUser, deleteUser})(withNavigate(withParams(User)));
