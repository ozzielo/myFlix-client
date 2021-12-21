import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
class MyFlixApplication extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <MainView />
            </BrowserRouter>

        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);