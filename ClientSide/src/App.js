import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, Store } from '../src/redux';
import { ToastContainer, toast } from "react-toastify";
import { createStore } from "redux";


const AppWrapper = () => {

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}
function App() {
  const loading = useSelector(state => console.log(state))
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AppWrapper;