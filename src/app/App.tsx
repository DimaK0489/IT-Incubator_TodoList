import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Todolists/Authorization/Login";
import {logOutTC} from "../features/Todolists/Authorization/authReducer";
import {selectIsInitialized, selectStatus} from "./selectors";
import {selectIsLoggedIn} from "../features/Todolists/Authorization/selectors";

type PropsType = {
    demo?: boolean
}

const App = ({demo = false}: PropsType) => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC());
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log Out</Button>}
                </Toolbar>
            </AppBar>
            <Container fixed>
                {status === "loading" && <LinearProgress color="secondary"/>}
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{textAlign: "center"}}>404.Page not found</h1>}/>
                    <Redirect from={'*'} to={'/login'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}
export default App;
