import {Component, Fragment} from "react";
import {FormControlLabel, Switch, InputBase} from "@mui/material";
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {connect} from "react-redux";
import {retrieveUsers} from '../actions/users';


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


class UsersFilters extends Component {

    constructor(props) {
        super(props);

        this.onShowDisabled = this.onShowDisabled.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onShowDisabled(event) {
        const {target} = event;
        this.props.retrieveUsers({...this.props.filters, active: !target.checked});
    }

    onSearch(event) {
        const {target} = event;
        this.props.retrieveUsers({...this.props.filters, q: target.value});
    }

    render() {
        return (
            <Fragment>
                <FormControlLabel
                    control={<Switch color="default" onClick={this.onShowDisabled}/>}
                    label="Show disabled"
                    labelPlacement="start"
                />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search..."
                        inputProps={{'aria-label': 'search'}}
                        onChange={this.onSearch}
                    />
                </Search>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters,
    };
};

export default connect(mapStateToProps, {retrieveUsers})(UsersFilters);
