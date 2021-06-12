import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

import { getUsers, getPostsByUser } from './api';
import {Header, UsersPosts} from './components';

const App = () => {

    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUsers()
        .then(users => {setUserList(users)})
        .catch(error => {
            console.log(error);
        });
    }, []);
    
    useEffect(()=>{
        if (!currentUser) {
            setUserPosts([]);
            return;
        }

        getPostsByUser(currentUser.id)
            .then(posts => {
                setUserPosts(posts);
            })
            .catch(error => {
                console.log(error);
            })
    }, [currentUser]);

  return (
    <div id="App">
      <Header userList={userList} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      {
          currentUser 
          ? <UsersPosts userPosts={userPosts} currentUser={currentUser} />
          : null
      }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);