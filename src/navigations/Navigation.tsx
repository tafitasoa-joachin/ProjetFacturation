import React, { useEffect } from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../screens/admin/login';
import Signup from '../screens/admin/signup';
import PasswordForgot from '../screens/admin/passwordforgot';
import Home from '../screens/Layout/Home';


export default function Navigation(){
    const navigate: any = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                if(token){
                    navigate("*"); // home page
                }else{
                    navigate("/login"); // login
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du token :', error);
            }
        };
        checkAuth();
    }, []);

    return(
        <Routes>
            <Route path="*" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forgotpassword" element={<PasswordForgot/>}/>
        </Routes>
    )
}