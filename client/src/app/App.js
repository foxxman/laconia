import React from "react";
import { Route, Switch } from "react-router-dom";

import Blog from "./layouts/blog";
import Login from "./layouts/login";
// import Chats from "./layouts/chats";
import Navbar from "./components/ui/NavBar";
import Main from "./layouts/main";
import ProtectedRoute from "./common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <Navbar />
                <Switch>
                    <Route path={"/login"} component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path={"/"} exact component={Main} />

                    <ProtectedRoute>
                        {/* <Route path={"/chats"} component={Chats} /> */}
                        <Route
                            path={"/blog/:userId?/:edit?"}
                            component={Blog}
                        />
                    </ProtectedRoute>
                </Switch>
            </AppLoader>
        </div>
    );
}

export default App;
