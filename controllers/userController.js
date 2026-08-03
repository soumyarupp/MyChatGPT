import express from "express";

const profile = async (req,res) => {
    res.send("User Profile Page");
}
const signUp = async (req,res) => {
    res.send("Sign Up page");
}

const login = async (req,res) => {
    res.send("Login page");
}
const logOut = async (req,res) => {
    res.send("LogOut page");
}

export {profile,signUp,login,logOut}