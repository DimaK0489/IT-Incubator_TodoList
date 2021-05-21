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
import {AppRootStateType} from "./store";
import {RequestStatusType, initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Route,Switch, Redirect} from 'react-router-dom';
import {Login} from "../features/Todolists/Login/Login";
import {logOutTC} from "../features/Todolists/Login/authReducer";

type AppWithReduxPropsType = {
    demo?: boolean
}

const AppWithRedux = ({demo = false}: AppWithReduxPropsType) => {

    const status = useSelector<AppRootStateType, RequestStatusType>((state => state.app.status))
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>( (state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
    },[])

    const logOutHandler = useCallback( () => {
        dispatch(logOutTC());
    },[])
    
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
                    { isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log Out</Button> }
                </Toolbar>
            </AppBar>
            <Container fixed>
                {status === "loading" && <LinearProgress color="secondary"/>}
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{textAlign: "center"}}>404.Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
