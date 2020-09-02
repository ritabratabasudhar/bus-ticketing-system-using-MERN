import React from 'react';
import './busSeat.css';
import driver from './driver.png'
import Bookingform from './bookingForm'
import history from '../history/history'


class Seatbooking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seat: [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '10', '11', '12',
        '13', '14', '15', 
        '16', '17', '18',
        '19', '20', '21',
        '22', '23', '24',
        '25', '26','27', 
        '28'],
      seatAvailable: [
        '1', '3',
        '4', '6',
        '7', '8', '9',
        '10', '11', '12',
        '13', '14', '15',
        '16', '17', '18',
        '19', '20', '21',
        '22', '23', '24',
        '25', '26','27', 
        '28', '29','30'],
      seatReserved: ['2', '5']
    }
  }
  onClickData(seat) {
    if (this.state.seatAvailable.indexOf(seat) > -1) {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
      })
    }
    else {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res !== seat)
      })
    }

  }



  render() {
    return (
      <div id="busSeat">
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved.length}
          price={this.props.bookedprice}
          onClickData={this.onClickData.bind(this)}

        />
      </div>
    )
  }
}

class DrawGrid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      reservedSeat: null,
      show: false
    }
    this.onLoadReserved = this.props.reserved;
  }



  onClickSeat(seat) {
    this.props.onClickData(seat);
    this.setState({ reservedSeat: (this.props.reserved - this.onLoadReserved + 1) });
  }
  calculateSeats = () => {
    //alert(this.props.price)

  }

  doNotShow = () => {
    this.setState({ show: false })
  }

  doShow = () => {
    this.setState({ show: true })
  }
  proceed = () => {
    history.push('/payment')
  }
  render() {

    return (

      <div className='container-fluid' >

        <table className="grid col-4" style={{ float: 'left' }} >
          <tbody>
            <tr><td><img src={driver} className='seat' /></td></tr>
            <br></br>
            <tr>
              {this.props.seat.map(row =>
                <td
                  className={this.props.available.indexOf(row) > - 1 ? 'available' : 'reserved'}
                  key={row} onClick={e => this.onClickSeat(row)}>{row} </td>)}
            </tr>
          </tbody>
        </table>
        {this.props.reserved > this.onLoadReserved ? <button className='btn btn-primary' onClick={this.doShow}>Make Reservation</button> : ''}
        <div className="col-6" style={{ float: 'right' }}>

          {this.state.show ? <Bookingform makeShow={this.doNotShow} reservedSeat={this.state.reservedSeat} /> : ''}
        </div>
        <button onClick={this.proceed}>payment</button>
      </div>


    )
  }




}

class AvailableList extends React.Component {
  render() {
    const seatCount = this.props.available.length;
    return (
      <div className="left">
        <h4>Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})</h4>
        <ul>
          {this.props.available.map(res => <li key={res} >{res}</li>)}
        </ul>
      </div>
    )
  }
}

class ReservedList extends React.Component {
  render() {
    return (
      <div className="right">
        <h4>Reserved Seats: ({this.props.reserved.length})</h4>
        <ul>
          {this.props.reserved.map(res => <li key={res} >{res}</li>)}
        </ul>

      </div>
    )
  }
}
export default Seatbooking;

