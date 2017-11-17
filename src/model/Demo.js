/**
 * Created by zhaoxi on 2017/11/17.
 */
import * as Service from '../service/Demo';

export const NameSpace = 'Demo';

export const Actions = {
    asyncDataList: (user) => {
        return {
            type: `${NameSpace}/asyncDataList`,
            payload: user
        }
    },
    update: () => {
        return {
            type: `${NameSpace}/update`
        }
    },
    load: (loading) => {
        return {
            type: `${NameSpace}/load`,
            payload: loading
        };
    },
    dataList: (data) => {
        return {
            type: `${NameSpace}/dataList`,
            payload: data
        }
    }
};

export default {
    namespace: NameSpace,
    state: {
        count: 0,
        loading: false,
        data: {}
    },
    reducers: {
        update(state){
            const {count} = state;
            return {
                ...state,
                count: count + 1
            };
        },
        load(state, {payload}){
            return {
                ...state,
                loading: payload
            };
        },
        dataList(state, {payload}){
            return {
                ...state,
                data: payload
            };
        }
    },
    asyncTasks: {
        asyncDataList({dispatch}, {payload}){
            dispatch(Actions.load(true));
            Service.getData(payload)
                .then(data => {
                    dispatch(Actions.load(false));
                    dispatch(Actions.dataList(data));
                }).catch(err => {
                dispatch(Actions.load(false));
            });
        }
    }
}