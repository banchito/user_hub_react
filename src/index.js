import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";

import { getUsers, getPostsByUser, getTodosByUser } from "./api";
import { Header, UsersPosts, UserTodos } from "./components";
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const App = () => {
  const [userList, setUserList]       = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts]     = useState([]);
  const [userTodos, setUserTodos]     = useState([]);

  useEffect(() => { getUsers()
      .then((users) => {
        setUserList(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

    if (!currentUser) {setUserPosts([]); setUserTodos([]); return; } 
      
    getPostsByUser(currentUser.id)
      .then((posts) => {
        setUserPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });

      getTodosByUser(currentUser.id)
      .then(todos => {
        setUserTodos(todos);
      })
      .catch(error => {
        console.log(error);
      });

  }, [currentUser]);

  return (
    <Router>
      <div id="App">
        <Header
          userList={userList}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}/>
        {
        
          currentUser ? <>
            <Switch>
              <Route path="/posts">
                <UsersPosts userPosts={userPosts} currentUser={currentUser} />
              </Route>
              <Route path="/todos">
                <UserTodos userTodos={userTodos} currentUser={currentUser} />
              </Route>
              <Route exact path="/">
                    <h2 style={{padding: ".5em"}}>Welcome, { currentUser.username }!</h2>
              </Route>
                  <Redirect to="/" />
            </Switch>
        </> : <>
            <Switch>
                <Route exact path="/">
                  <h2 style={{
                    padding: ".5em"
                  }}>Please log in, above.</h2>
                </Route>
                <Redirect to="/" />
            </Switch>
            </>
        }
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
