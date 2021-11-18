import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import Room from './Room';
import firebase from 'firebase/firebase-browser';

// 라우팅 정의
const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="rooms" component={Rooms}>
        <Route path=":roomId" component={Room} />
      </Route>
    </Route>
  </Router>
);

// Routing 초기화
if (!location.hash.length) {
  location.hash = "#/login";
}

// Firebase 초기화하기
const firebaseConfig = {
  apiKey: "AIzaSyD3nQ1txM8LEsgqT-HTjajWRr9kgJuHt2o",
  authDomain: "electron-chat-d61bc.firebaseapp.com",
  databaseURL: "https://electron-chat-d61bc-default-rtdb.firebaseio.com/",
  projectId: "electron-chat-d61bc",
  storageBucket: "electron-chat-d61bc.appspot.com",
  messagingSenderId: "865418066567",
  appId: "1:865418066567:web:11a0d4dce846d4589e1622",
  measurementId: "G-F3HLHBF7QP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

render(appRouting, document.getElementById('app'));