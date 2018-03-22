import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import addEventAction from '../action/addEventAction';
import getUsersAllEventAction from '../action/getUsersAllEventAction';
import deleteAnEventAction from '../action/deleteAnEventAction';
// import editAnEventAction from '../action/editAnEventAction';


import '../../style.scss';

export class EventHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addEventDetails: {
        eventName: '',
        eventLocation: '',
        eventVenue: '',
        eventDate: '',
      },
    };

    this.handleEventName = this.handleEventName.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
  }


  componentDidMount() {
    this.props.getAllCenters();
    this.props.getUsersAllEventAction(localStorage.getItem('userIdNo'));
  }

  handleEventName(e) {
    this.setState({ addEventDetails: Object.assign(this.state.addEventDetails, { eventName: e.target.value }) });
    return true;
  }

  handleEventDate(e) {
    this.setState({ addEventDetails: Object.assign(this.state.addEventDetails, { eventDate: e.target.value }) });
    return true;
  }

  handleDeleteEvent(index) {
    this.props.deleteAnEventAction(index);
    return true;
  }

  handleAddEvent(eventDetails) {
    //   prevent submitting automatically
    eventDetails.preventDefault();
    this.props.centerState.map((center) => {
      if (this.refs.eventCenterId.value === center.name) {
        const cent = center.id;
        localStorage.setItem('AddcenterId', center.id);
        return cent;
      }
    });


    // get event details
    const eventToAdd = {
      name: this.state.addEventDetails.eventName,
      bookingStatus: 1, // 0 signifies booking cancel while 1 signifies booking booked
      centerId: localStorage.getItem('AddcenterId'),
      eventDate: this.state.addEventDetails.eventDate,
    };

    // Add new event
    this.props.addNewEvent(eventToAdd);
  }

  handleLocation() {
    if (this.refs.eventCenterId.value !== 'Please select center') {
      this.props.centerState.map((center) => {
        if (this.refs.eventCenterId.value === center.name) {
          window.document.getElementById('location').value = center.location;
          this.setState({ addEventDetails: Object.assign(this.state.addEventDetails, { eventLocation: center.location, eventVenue: center.name }) });
          return true;
        }
        window.document.getElementById('location').innerHTML = 'London bridge';
      });
    }
    window.document.getElementById('location').innerHTML = 'London bridge';
    return false;
  }

  render() {
    return (
        <div >
        <div className="bg-primary container-fluid p-2 text-center">
          <div className="row">
              <div className="col">
                      <h4>EVENT MANAGEMENT</h4>
              </div>

              <div className="col">
                  <ul className="nav justify-content-end">
                      <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false"><i className="fa fa-cog"></i> Setting</a>
                              <div className="dropdown-menu">
                                  <a href="/" className="dropdown-item"> Sign Out</a>
                                  <a className="dropdown-item" href="/edit-event"> Edit Event</a>
                                  <a className="dropdown-item" href = "/booking-details" > Booking</a>
                              </div>
                      </li>

                  </ul>
              </div>
          </div>

      </div>

{/* Create two columns for the management content */}
{/* create a section  */}
<div className="section">
< div className = "section-cover-user" >
  <div className="container">
    <div className="row event-body">
    <div className="col-md-7 col-sm-12 mb-4 pt-2">
          <div className="text-center bg-danger text-white p-2 mb-2">
                      <h4>EVENTS</h4>
          </div>

          {/* Create a table and populate it with events from the database */}
          <div className="eventlist bg-primary text-center text-dark p-3">
              <table className="table-sm text-center table-hover mx-auto table-responsive-sm table-striped bg-white">
                  <thead className="text-center bg-info border border-white text-white">
                      <tr className="p-3">
                          <th scope="col" className="border border-white"> S/N</th>
                          <th scope="col" className="border border-white">Event Name</th>
                          <th scope="col" className="border border-white">Venue</th>
                          <th scope="col" className="border border-white">Location</th>
                          <th scope="col" className="border border-white">Date</th>
                          <th scope="col" className="border border-white">Status</th>
                          <th scope="col"></th>
                      </tr>
                  </thead>
                  <tbody>

                      {/* populate the row of the table with events */}
                      {
                          // map through array of events and insert into the rows of the table
                          this.props.eventState.map((event, index) =>

                              // return the rows generated

                      <tr key={index} index={index} addre = {event.id} className="border border-white">
                          <td scope="row">{index + 1}</td>
                          <td>{event.name}</td>
                          <td>{this.props.centerState.map((center) => {
                              if (center.id === event.centerId) {
                                  return center.name;
                                  }
                          })}</td>
                          <td>{this.props.centerState.map((center) => {
                              if (center.id === event.centerId) {
                                  return center.location;
                                  }
                          })}</td>
                          <td>{event.eventDate}</td>
                          {(event.bookingStatus === 1) ? <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}

                          <td>
                              <div className="row">


                                  {/* Execute delete operation */}
                                  <div className="col"><button type="button" onClick = { this.handleDeleteEvent.bind(this, event.id) } className="btn btn-danger btn-block">
                                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                                  </button></div>
                              </div>

                          </td>

                      </tr>)
                      }
                  </tbody>
              </table>
          </div>

      </div>

      <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">
              <form className="p-2" onSubmit={this.handleAddEvent} id='addEventForm'>
                  <div className="bg-danger text-center text-white p-2 mb-3">
                      <h4>ADD EVENT</h4>
                  </div>

                  <div className="form-group">
                      <label htmlFor="eventname"> Event Name:</label>
                      <input type="text"
                      id="eventname"
                      required
                      className="form-control"
                      placeholder="e.g.Wedding"
                      aria-describedby="helpId"
                      onChange = { this.handleEventName } />
                  </div>

                  <div className="form-group">
                      <label htmlFor="eventCentre">Event Centre</label>
                      <select ref='eventCenterId' className="form-control" id="eventCentre" required onChange={this.handleLocation}>
                          <option defaultValue>Please select center</option>
                          {this.props.centerState.map((center, i) => <option key={i} i={i} value={center.name}>{center.name}</option>)}
                      </select>

                  </div>

                  <div className="form-group">
                      <label htmlFor="location"> Location:</label>
                      <input type="text"
                      id="location"
                      required
                      className="form-control"
                      readOnly
                      placeholder="London bridge"
                      aria-describedby="helpId" />
                  </div>

                  <div className="form-group">
                      < label htmlFor = "eventdate" > Event Date : </label>
                      <input type="date"
                      id="eventdate"
                      className="form-control"
                      placeholder="12/22/2017"
                      aria-describedby="helpId"
                      required
                      onChange = { this.handleEventDate } /><br />
                      <span id='dateAvailable' className='text-danger'></span>
                  </div>
                  <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                      <h4 className="text-white"><i className="fa fa-save" aria-hidden="true"> Add Event</i></h4>
                  </button>
              </form>


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

const mapStateToProps = state => ({
  centerState: state.centerState,
  eventState: state.eventState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  addNewEvent: addEventAction,
  getUsersAllEventAction,
  deleteAnEventAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventHomePage);

