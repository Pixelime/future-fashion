import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {Provider} from 'react-redux';
import store from './store';

import Users from './components/Users';
import User from './components/User';


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Container maxWidth="sm">
                    <AppBar position={"static"}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Users
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route path="/" exact element={<Users/>}/>
                        <Route path="/:id" element={<User/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
