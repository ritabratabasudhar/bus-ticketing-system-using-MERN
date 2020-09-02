import React, { Component } from 'react';
import store from '../redux/store'
class Confirm extends Component {
    state = { matched:[] }
    myClick=(storeValue)=>{
        const match=[];
        let i=0;
        storeValue.customerName.map(()=>{
         match.push({name:storeValue.customerName[i]})
         i=i+4;
        })
        this.setState({matched:match})

    }
    render() { 
        const storeValue=store.getState();
        return ( <div>
            <button onClick={this.myClick(storeValue)}>myClick</button>
        </div> );
    }
}
 
export default confirm ;