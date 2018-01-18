import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';
import cancelBookingAction from '../action/cancelBookingAction';
import getUserEmailAction from '../action/getUserEmailAction';
import sendMailNotificationAction from '../action/sendMailNotificationAction';

class CenterDetails extends Component {
  constructor(props) {
    super(props);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount() {
    this.props.getAllCenterAction();
    this.props.getUserEmailAction();
  }


  handleReBooking(eventId) {
    this.props.getACenterState.map((events) => {
      if (events.id === eventId) {
        const changeBooking = {
          bookingStatus: 1,
          eventDate: events.eventDate,
        };
        this.props.cancelBookingAction(changeBooking, eventId, events.id);
      }
    });
  }

  handleCancelBooking(eventId) {
    this.props.getACenterState.map((events) => {
      if (events.id === eventId) {
        const changeBooking = {
          bookingStatus: 0,
          eventDate: events.eventDate,
        };
        this.props.userEmailState.map((user) => {
          if (user.id === events.userId) {
            const userEmail = {
              email: user.email,
              messageBody: `Dear ${user.firstName},
              
            We regret to inform you that the ${events.name} event you booked, which was slated for ${events.eventDate} has been cancelled for some unavoidable reason.
              
            We are very sorry for any inconviences this might caused you.
              
            Yours faithfully,
            The Event Manager`,
            };
            this.props.sendMailNotificationAction(userEmail);
          }
          return user;
        });
        return this.props.cancelBookingAction(changeBooking, eventId, events.id);
      }
      return events;
    });
  }

  handleLocation() {
    if (this.refs.eventCenterId.value !== 'Please select center') {
      this.props.centerState.map((center) => {
        if (this.refs.eventCenterId.value === center.name) {
          this.props.getACenterAction(center.id);
          window.document.getElementById('eventCenterLocation').value = center.location;
          window.document.getElementById('eventCenterCapacity').value = center.capacity;
          return window.document.getElementById('eventcenteramountEdit').value = center.amount;
        }
        window.document.getElementById('eventCenterLocation').innerHTML = 'London bridge';
      });
    }
    if (this.refs.eventCenterId.value === 'Please select center') {
      this.props.getACenterAction(100000);
      window.document.getElementById('eventCenterLocation').value = '';
      window.document.getElementById('eventCenterCapacity').value = '';
      return window.document.getElementById('eventcenteramountEdit').value = '';
    }
    return false;
  }

  render() {
    return (
            <div>
                {/* Setup the header  */}
    <div className="bg-primary container-fluid p-2 text-center">
        <div className="row">
           <div className="col">
                   <h3>EVENT CENTER MANAGEMENT</h3>
           </div>

           <div className="col">
               <ul className="nav justify-content-end">
                   {/* <li className="nav-item dropdown">
                           <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                           <div className="dropdown-menu">
                               <a href="/" className="dropdown-item"> Sign Out</a>
                               <a href="/centers" className="dropdown-item"> Home</a>
                           </div>
                   </li> */}
                   <li className="nav-item"> <a href="/" className="text-white"> SIGNOUT <i className="fa fa-chevron-right"></i></a></li>
               </ul>
           </div>
        </div>

   </div>

     {/* Create two columns for the management content  */}
     {/* create a section  */}
    <div className="section">
        <div className="section-cover-viewcenter">
            <div className="container">
                <div className="row event-body">

                    <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">
                        <form className="p-2 text-dark">
                            <div className="bg-danger text-center text-white p-2 mb-3">
                                <h4>EVENT CENTER</h4>
                            </div>

                            <div className="form-group">
                            <label htmlFor="centerName">Center Name</label>
                            <select ref='eventCenterId' className="form-control" id="centerName" required onChange={this.handleLocation}>
                                <option>Please select center</option>
                                {this.props.centerState.map((center, i) => <option key={i} i={i} value={center.name}>{center.name}</option>)}
                            </select>

                        </div>

                            <div className="form-group">
                                <label htmlFor="eventCenterLocation"> Location:</label>
                                <input type="text" readOnly id="eventCenterLocation" className="form-control" placeholder="" aria-describedby="helpId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="eventCenterCapacity"> Capacity:</label>
                                <input type="text" readOnly id="eventCenterCapacity" className="form-control" placeholder="" aria-describedby="helpId" />
                            </div>

                            <div className="form-group">
                                  <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                  <input type="numbers" id="eventcenteramountEdit" className="form-control" placeholder="" aria-describedby="helpId" required/>
                            </div>

                            <a className="btn btn-success btn-sm btn-block mb-3" href="/centers">
                                <h4 className="text-white">
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                </h4>
                            </a>

                        </form>

                    </div>


                    <div className="col-md-7 col-sm-12 mb-4 pt-2">
                        <div className="text-center bg-danger text-white p-2 mb-2">
                            <h4>EVENTS ACTIVITIES</h4>
                        </div>

                        <div className="eventlist bg-primary text-center text-dark p-3" >
                            <table className="table-sm text-center table-hover mx-auto bg-white table-responsive-sm table-striped">
                                <thead className="text-center text-white bg-info border border-white">
                                    <tr className="p-3">
                                        <th scope="col" className="border border-white"> S/N</th>
                                        <th scope="col" className="border border-white">Event name</th>
                                        <th scope="col" className="border border-white">Event Date</th>
                                        <th scope="col" className="border border-white">Booking Status</th>
                                        <th scope="col">Re-book/Cancel bookings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.getACenterState.map((centers, i) =>
                                            <tr id="#1" key={i} className="border border-white">
                                                <td scope="row">{ i + 1 }</td>
                                                <td>{centers.name}</td>
                                                <td>{centers.eventDate}</td>

                                                {(centers.bookingStatus === 1) ? <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}
                                                <td>
                                                    <div className="row">
                                                        <div className="col mb-2">
                                                            <button type="button" className="btn btn-success btn-block" index = {i} onClick = { this.handleReBooking.bind(this, centers.id) } >
                                                            <i className="fa fa-book" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="button" className="btn btn-danger btn-block" index = {i} onClick = { this.handleCancelBooking.bind(this, centers.id) } >
                                                                <i className="fa fa-close" aria-hidden="true"></i>
                                                            </button>
                                                        </div>

                                                    </div>

                                                </td>

                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="section">
        <div className="footer p-1 bg-primary mt-0 text-center">
            <h4>&copy; 2017</h4>
        </div>
    </div>

            </div>
    );
  }
}

CenterDetails.propTypes = {
  handleReBooking: React.PropTypes.func.isRequired,
  handleCancelBooking: React.PropTypes.func.isRequired,
  handleLocation: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  centerState: state.centerState,
  getACenterState: state.getACenterState,
  userEmailState: state.userEmailState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenterAction,
  getACenterAction,
  cancelBookingAction,
  getUserEmailAction,
  sendMailNotificationAction,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
