import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/login';
import Home from './pages/home';

import store from './store'
import Header from './components/header';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Header />} >
                        <Route index element={<Home />} />

                    </Route>
                    {/* <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
