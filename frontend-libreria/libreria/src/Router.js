import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NewBook from "./components/NewBook";
import Books from "./components/Books";
import NewSales from "./components/NewSale";

const Router = () =>{
    return(

        <BrowserRouter>
        
            <Header/>

            <Routes>
                <Route path="/" element={<NewBook/>}/>
                <Route exact path="/books" element= {<Books/>}/>
                <Route path="/sales" element= {<NewSales/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default Router;