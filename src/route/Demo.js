/**
 * Created by zhaoxi on 2017/11/17.
 */
import {connect} from 'react-redux';

import DemoScreen from '../screen/DemoScreen';

import {NameSpace, Actions} from '../model/Demo';

const mapStateToProps = (state) => {
    const data = state[NameSpace];
    return {...data};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: () => {
            dispatch(Actions.update());
        },
        onRequestData: (user) => {
            dispatch(Actions.asyncDataList(user));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoScreen);