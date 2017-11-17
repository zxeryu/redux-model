import React  from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import Routers from './Routes';

/**
 * 核心类，管理所有的model
 * @constructor
 */
function App() {
    this.MODELS = {};
    this.REDUCER = {};
    this.store = {};

    /**
     * 根据model构建reducer，根据action调用model中reducers中的方法
     */
    const createReducer = (model) => (state = model.state, action) => {

        const {reducers, namespace} = model;

        if (!action.hasOwnProperty('type')) {
            return state;
        }
        if (action.type.indexOf('/') < 0) {
            return state;
        }
        const tmp = action.type.split('/');
        const type = tmp[1];
        if (tmp[0] === namespace && reducers.hasOwnProperty(type)) {
            return reducers[type](state, action);
        } else {
            return state;
        }
    };

    /**
     * 将所有的所有的model中的reducers对象生成reducer，并合并到 this.REDUCER类中
     */
    this.combine = function (state = {}, action) {
        for (let index in this.MODELS) {
            let model = this.MODELS[index];
            let {namespace} = model;
            this.REDUCER = {
                ...this.REDUCER,
                [model.namespace]: createReducer(model)(state[namespace], action)
            }
        }
        return this.REDUCER;
    }.bind(this);

    /**
     * 中间件，处理Model中的asyncTasks
     * @param dispatch
     */
    const asyncTaskMiddleware = ({dispatch}) => next => action => {

        const tmp = action.type.split('/');
        if (Array.isArray(tmp) && tmp.length === 2) {
            const namespace = tmp[0];
            const asyncTask = tmp[1];
            //若action对应的是model中的asyncTasks的方法，调用该方法
            if (this.MODELS.hasOwnProperty(namespace) && this.MODELS[namespace].asyncTasks.hasOwnProperty(asyncTask)) {
                this.MODELS[namespace].asyncTasks[asyncTask]({dispatch}, action);
            }
        }

        return next(action);
    };

    /**
     * 将model合并到this.MODELS中
     */
    this.use = function (model) {

        this.MODELS = {
            ...this.MODELS,
            [model.namespace]: model
        };

    }.bind(this);


    // store
    this.makeStore = function () {
        this.store = createStore(this.combine, applyMiddleware(asyncTaskMiddleware));
        // 监听
    }.bind(this);

    // 启动
    this.start = function () {
        // 重构store
        this.makeStore();
        // 监听
        // this.subscriptions();

        ReactDOM.render(
            <Provider store={this.store}>
                <Routers/>
            </Provider>
            , document.getElementById('root')
        );

        registerServiceWorker();
    }.bind(this);
}

export default new App();