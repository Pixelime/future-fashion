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
                    <Routes>
                        <Route path="/" exact element={<Users/>}/>
                        <Route path="/new-user" element={<User isNew={true}/>}/>
                        <Route path="/:id" element={<User/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
