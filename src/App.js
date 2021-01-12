import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTask from "./pages/NewTask";
import MenuBar from "./components/Menu";
import {Container} from "semantic-ui-react";
import {AuthProvider} from "./context/auth";
import AuthRoute from "./util/AuthRoute";

function App() {
    return (
        <AuthProvider>
            <Container>
                <Router>
                    <MenuBar/>
                    <Route exact path='/' component={Home}/>
                    <AuthRoute exact path='/register' component={Register}/>
                    <AuthRoute exact path='/login' component={Login}/>
                    <Route exact path='/new-task' component={NewTask}/>
                </Router>
            </Container>
        </AuthProvider>
    );
}

export default App;
