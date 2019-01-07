import axios from 'axios';
import App from "./components/App";
import React from "react";
import ReactDOM from 'react-dom';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status == 401) {
    Auth.logout();
  }
});

export const Auth = {
  authenticated() {
    return !!localStorage.getItem('token');
  },
  login({email, password}) {    
    return axios.post("http://localhost:8080/login", {email, password})
      .then((res) => {
        let {token, user} = res.data;
        localStorage.setItem('profile', JSON.stringify(user));
        localStorage.setItem('token', token);        
        axios.interceptors.request.use((config) => {
          config.headers['authorization'] = `Bearer ${token}`;
          return config;
        });
        if(res.data.user.email.indexOf("admin") !== -1){
          ReactDOM.render(
                <App authenticated="true" userType="admin"/>,
                document.getElementById('root')
              );
        }else{
          ReactDOM.render(
                <App authenticated="true" userType="user"/>,
                document.getElementById('root')
              );
        }
                
      });
    
  },
  logout(event) {    
    ReactDOM.render(
      <App authenticated="false" />,
      document.getElementById('root')
    );
    event.preventDefault();
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });    
    window.location = '/#/login';
  }
};
