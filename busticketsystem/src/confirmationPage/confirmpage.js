import React, { Component } from 'react';
import store from '../redux/store'
import './confirmpage.css'
class ConfirmPage extends Component {
    state = {
        matched: [],
        flag: false
    }
    myClick(storeValue) {
        const match = [];
        let i = 0;
        storeValue.customerName.map(() => {
            if (i < storeValue.customerName.length) {
                match.push({ name: storeValue.customerName[i] })
                i = i + 4;
            }
        })

        console.log("match")
        this.setState({
            matched: match,
            flag: true
        }, () => console.log(this.state.matched))



    }
    render() {
        const storeValue = store.getState();
        return (<div id="confirmPage">
            <h1>Thank You For booking with Us</h1>
            {this.state.flag == false ?
                <button onClick={() => this.myClick(storeValue)}>Get The Ticket</button> :



                this.state.matched.map((data) => <div class="tickets"><div className="card" id="ticketContent">
                    <h4>BUS_NO:-{storeValue.BUS_NO}  </h4>
                    <h4>Journey start from:-{storeValue.From} &nbsp; &nbsp;</h4>
                    <h4> End to:-{storeValue.To}</h4>
                    <h4>Journey Date:-{storeValue.Date}</h4>
                    <h4>Passenger Name:-</h4>
                    <h4>name:-{data.name}</h4>
                </div>
                </div>
                )}
        </div>);

    }
}

export default ConfirmPage;