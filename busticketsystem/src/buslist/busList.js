import React,{createContext} from 'react';
import data from './buslist.json'
import './buslist.css'
import history from '../history/history'
//export const ThemeContext= createContext();
import { connect } from "react-redux";
import store from '../redux/store';

class Buslist extends React.Component {
    state = {
        time: "",
        busno: "",
        To: "",
        From: "",
        Date: "",
        matchEle: [],
        busticket:"",
        check: false
    }
    handleChangeAll = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }
    matchList = () => {
        const matched = []
        let flag = 1
        if (this.state.Date == "") {
            alert("enter date")
        }
        else {
            data.map((e) => {
                if (e.to === this.state.To && e.from === this.state.From) {
                    matched.push({
                        busno: e.busno,
                        to: e.to,
                        time: e.time,
                        from: e.from,
                        price: e.price
                    })
                    flag = 0
                    this.setState({
                        check: true
                    }, () => console.log(this.state.check))
                }

            })
            if (flag == 1) {
                alert("bus not found")
            }
        }
        this.setState({
            matchEle: matched
        })

    }
    handlePrice(price,time,busno) {
        console.log("price")
        console.log(price)
        console.log(time)
        history.push('/seatbooking')
        //alert(this.props.price)
        this.setState({
            busticket:price
        })
        store.dispatch({ type: "AGE_UP", value: price,To:this.state.To,From:this.state.From,Date:this.state.Date,TIME:time,BUS_NO:busno })
        //console.log(`the store is ${storevalue}`)
    }

    render() {
        const storevalue=store.getState();
        store.subscribe(() => {
            
        })
        return (
            <div id="buslist">
                <div class="container">
        <h2 style={{ textAlign: "center" }}>Check the bus details {storevalue.price}</h2>
                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>Select source</label>
                                    <select class="form-control" onChange={this.handleChangeAll} name="From">
                                        <option value>-</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="kolkata">Kolkata</option>
                                        <option value="bengaluru">Bengaluru</option>
                                        <option value="vizag">Vizag</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-4" >
                                <div class="form-group">
                                    <label>Select Destination</label>
                                    <select class="form-control" onChange={this.handleChangeAll} name="To">
                                        <option value>-</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="kolkata">Kolkata</option>
                                        <option value="bengaluru">Bengaluru</option>
                                        <option value="vizag">Vizag</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <label for="birthday">Select Date</label><br></br>
                                <input type="date" name="Date" onChange={this.handleChangeAll} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="form">
                            <button className="btn btn-primary" onClick={this.matchList}>Search Bus</button>
                        </div>

                    </div>
                </div>
                
                   
                        

                {this.state.check==false?"": 
                <div class="container">
                        <h2>Available bus Details</h2>    <table class="table">
                            <thead>
                                <tr>
                                <th>Bus-No</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Departure Time</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.matchEle.map((data, i) => <tr key={i} >


                                <td>{data.busno}</td>
                                    <td>{data.from}</td>
                                    <td>
                                        {data.to}
                                    </td>
                                    <td>{data.time}</td>
                                    <td>
                                        {data.price}

                                    </td>
                                    <td>
                                        <button onClick={() => this.handlePrice(data.price,data.time,data.busno)} className="btn btn-warning" >BOOK</button>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        </div>}
                    
                </div>
            
            
        );
    }
}

// const mapStateToProps = state => {
//     return {
//       age: state.age
//     };
//   };
  
//   const mapDispachToProps = dispatch => {
//     return {
//       handlePrice: (p) => dispatch({ type: "AGE_UP", value: p }),
//       onAgeDown: () => dispatch({ type: "AGE_DOWN", value: 1 })
//     };
//   };
  export default Buslist;