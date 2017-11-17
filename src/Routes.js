/**
 * Created by zhaoxi on 2017/11/17.
 */
import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import Demo from './route/Demo';


class BasicRouter extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Demo}/>
                </div>
            </BrowserRouter>
        );
    }

}

export default BasicRouter;