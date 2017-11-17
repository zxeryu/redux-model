/**
 * Created by zhaoxi on 2017/11/17.
 */
import NetUtil from '../util/NetUtil';

export function getData(user) {
    return NetUtil('https://api.github.com/users/' + user);
}