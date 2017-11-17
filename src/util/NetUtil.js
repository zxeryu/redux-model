/**
 * Created by zhaoxi on 2017/11/13.
 *
 * "proxy": "http://api.douyacun.cn"
 *
 */
import axios from 'axios';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    let error = new Error(response.status);
    error.response = response.status;
    error.message = '服务器出错了!';
    throw error;
}

function parseJson(response) {
    return response.data;
}

// /**
//  * 统一错误处理
//  * @param data
//  */
// function parseErrorMessage(response) {
//     const {code, msg, data} = response;
//     if (code != 0) {
//         let error = new Error();
//         error.message = msg;
//         throw error;
//     }
//     return data ? data : true;
// }

export function post(url, params) {

    console.log(params);


    return axios.post(url, params)
        .then(checkStatus)
        .then(parseJson)
        // .then(parseErrorMessage)
        .catch(function (err) {
            alert(err.message);
            // console.log(err.message);
        });
}

export default function (url) {


    return axios.get(url)
        .then(checkStatus)
        .then(parseJson)
        // .then(parseErrorMessage)
        .catch(function (err) {
            alert(err.message);
            // console.log(err.message);
        });
}