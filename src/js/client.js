import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

//view logic (react)
import Layout from "./components/Layout"
//state logic (redux)
import store from "./store"

const app = document.getElementById('app')

/*
Pass in the store as a prop to layout component
To bind react and redux, you want to wrap your top-level component
in the redux provider. In this case we are wrapping our Layout component
in it.
This binds react and redux in our app
So we render the provider and pass in the store as a prop
Now any component can import data from the store and dispatch actions 
*/
ReactDOM.render(<Provider store={store}>
  <Layout />
</Provider>, app);
