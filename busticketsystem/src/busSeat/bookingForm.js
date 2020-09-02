import React from 'react';
import './bookingForm.css'
import history from '../history/history'
import store from '../redux/store';


export default class Bookingform extends React.Component {
   

   constructor(props) {
      super(props);
   }

   state = {
      formState: {
         name: "",
         gender: "",
         mode: "submit"
      },
      users: [],
      seat: this.props.reservedSeat,
      details:[],
      nameDetails:[],
      customerName:[]
   };

   resetFormState = () => {
      this.setState({
         formState: {
            name: "",
            gender: "",
            mode: "submit",
         }
      });
   };

   onChange = event => {
      this.setState({
         formState: {
            ...this.state.formState,
            [event.target.name]: event.target.value
         }
      });
      
      console.log(this.state.formState)
   };

   onSubmit = event => {
      const { users, formState } = this.state;
      event.preventDefault();
      const name = event.target.querySelector("input[name='name']").value;
      const gender = event.target.querySelector("input[name='gender']").value;
      

      if (formState.mode === "submit") {

         this.setState({
            users: [
               ...this.state.users,
               {
                  name,
                  gender,
                  updating: false,
               }
            ]
         })
      
         this.setState({ seat: this.state.seat - 1,
      
         });
      } else if (formState.mode === "Edit") {
         const index = users.find((user) => user.id === formState.id).id;
         users[index] = {
            name,
            gender,
            updating: false,
         }
         this.setState({
            users: [...users]
         });
      }

      this.resetFormState();
   };

   updateUser = key => {
      let { users } = this.state;
      users[key].updating = true;

      this.setState({
         formState: { ...this.state.users[key], mode: "Edit" },
         users
      });
   };
   saveDetails=(storeValue)=>{
      store.dispatch({type:"BOOKING_DETAILS",name:this.state.formState.name,ticketPrice:storeValue.price*this.props.reservedSeat})
      //history.push('/payment');
      console.log(`store is ${storeValue}`)
   }
     
   render() {
      const storeValue=store.getState();
      const { users, formState } = this.state;
      return (
         <div>
            <div className = "info">
      
            <h4>Passenger Details</h4>
            </div>
            {this.state.seat == 0 ? '' : <Form
               formState={formState}
               onChange={this.onChange}
               onSubmit={this.onSubmit}
            />}
            <Table
               users={users}
               updateUser={this.updateUser}
            />
            <button onClick={this.saveDetails(storeValue)}>BUY{storeValue.price*this.props.reservedSeat}</button>
         </div>
      );
   }
}

const Table = ({ users = [], updateUser }) => {
   return (
      <table className="table table-dark table-striped ">
         <thead className='bg-primary'>
            <tr>
               <th>Passenger Name</th>
               <th>Gender</th>
               
            </tr>
         </thead>
         <tbody>
            {users.map((user, key) => <tr key={key}>
               <td>{user.name}</td>
               <td>{user.gender}</td>
              
            </tr>

            )}
         </tbody>
      </table>
      
   );
};

const Field = ({ label = "", name = "", value = "", onChange }) => {
   return (
      <div className="field">
         <label htmlFOR={name}>{label}</label>
         <input type="text" name={name} value={value} onChange={onChange} />
      </div>
   );
};

const Form = ({ formState, onChange, onSubmit }) => {
   return (
      <form className="form1" onSubmit={onSubmit}>
         <fieldset>
            <Field
               name="name"
               label="Passenger Name"
               value={formState.name}
               onChange={onChange}
            />
            <Field
               name="gender"
               label="Gender"
               value={formState.gender}
               onChange={onChange}
            />
         </fieldset>
         <button>{formState.mode}</button>
      </form>
   );
};

