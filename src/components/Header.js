import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import {storeCurrentUser, clearCurrentUser} from '../auth'
import "./Header.css";

const Header = ({ currentUser, setCurrentUser,userList }) => {

    const [selectedUser, setSelectedUser] = useState();
   
    useEffect(() => { setSelectedUser(userList[0]);}, [userList]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
    }
  
    const handleSelectChange = (event) => {
      const id = event.target.value;
      const user = userList.find(user => user.id == id);
      setSelectedUser(user);
    }
  
    const handleUserLogin = (event) => {
      storeCurrentUser(selectedUser);
      setCurrentUser(selectedUser);
    }
  
    const handleUserLogout = (event) => {
      setSelectedUser(userList[0]);
      clearCurrentUser();
      setCurrentUser(null);
    }
  
    return (
      <header>
      <h1>Welcome to UserHub</h1>
      <form 
        className="user-select" 
        onSubmit={ handleSubmit } >
        {
          currentUser
          ? <> 
              <NavLink to="/posts" activeClassName="current">POSTS</NavLink>
              <NavLink to="/todos" activeClassName="current">TODOS</NavLink>
              <button onClick={ handleUserLogout }>LOG OUT, { currentUser.username }</button>
            </>
          : <>
              <select onChange={ handleSelectChange }>{
                userList.map(user => (
                  <option key={ user.id } value={ user.id }>
                    { user.username }
                  </option>
                ))
              }</select>
              <button onClick={ handleUserLogin }>LOG IN</button>
            </>
        }
      </form>
    </header>
    );
  }
 export default Header;