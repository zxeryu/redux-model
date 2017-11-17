/**
 * Created by zhaoxi on 2017/11/17.
 */
import React from 'react';

class DemoScreen extends React.Component {


    render() {

        const {count, loading, data} = this.props;
        const {onUpdate, onRequestData} = this.props;

        return (
            <div>
                <p>1、增加Action</p>
                <p>
                    <span>{count}</span>
                    <button style={{marginLeft: '20px'}} onClick={onUpdate}>add</button>
                </p>
                <p>2、异步Action</p>
                <button
                    onClick={() => {
                        onRequestData('aaa');
                    }}>
                    getTestDataFrom github
                </button>

                {loading ? <p>正在加载...</p> : null}

                <p>{JSON.stringify(data)}</p>

            </div>
        );
    }

}

export default DemoScreen;