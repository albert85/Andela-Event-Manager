import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import addEventAction from '../action/addEventAction';


import '../../style.scss';

class EventHomePage extends Component {
  constructor(props) {
    super(props);

    this.handleLocation = this.handleLocation.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  componentDidMount() {
    this.props.getAllCenters();
  }

  handleAddEvent(eventDetails) {
    //   prevent submitting automatically
    eventDetails.preventDefault();
    const centerIdNo = this.props.getAllCentersState.map((center) => {
      if (this.refs.eventCenterId.value === center[0].name) {
        return center[0].id;
      }
    });

    // get event details
    const eventToAdd = {
      name: eventDetails.target[0].value,
      bookingStatus: 1, // 0 signifies booking cancel while 1 signifies booking booked
      centerId: centerIdNo[0],
      eventDate: eventDetails.target[3].value,
    };

    // Add new event
    this.props.addNewEvent(eventToAdd);
    // check if the data is available
    if(localStorage.getItem('message') === 'The date is not available, please choose another'){
        return window.document.getElementById('dateAvailable').innerHTML = 'Date not Available for booking';
        // return true;
    }

    // reset the form if the data is available
    if (localStorage.getItem('message') === 'sucessfully created'){
        window.document.getElementById('dateAvailable').innerHTML = '';
       return window.document.getElementById('addEventForm').reset();
    }

    
  }

  handleLocation() {
    if (this.refs.eventCenterId.value !== 'Please select center') {
      this.props.getAllCentersState.map((center) => {
        if (this.refs.eventCenterId.value === center[0].name) {
          window.document.getElementById('location').value = center[0].location;
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
            <div>
              <div className="bg-primary container-fluid p-2 text-center">
                <div className="row">
                    <div className="col">
                            <h3>EVENT MANAGEMENT</h3>
                    </div>

                    <div className="col">
                        <ul className="nav justify-content-end">
                            <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                                    <div className="dropdown-menu">
                                        <a href="index.html" className="dropdown-item"> Sign Out</a>
                                        <a href="Admin.html" className="dropdown-item"> Add new center</a>
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

                <div className="scrollevent bg-primary text-center text-dark p-3" id="eventlist">
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

                            <tr id="#1" className="border border-white">
                                <td scope="row">1</td>
                                <td>Wedding</td>
                                <td>Apollan</td>
                                <td>11/12/2017</td>
                                <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td>
                                <td>
                                    <div className="row">
                                        <div className="col mb-2"><a href="#" className="btn btn-success btn-block">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a></div>
                                        <div className="col"><a href="#" className="btn btn-danger btn-block">
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </a></div>
                                    </div>

                                </td>

                            </tr>
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
                            <input type="text" id="eventname" required className="form-control" placeholder="e.g.Wedding" aria-describedby="helpId" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventCentre">Event Centre</label>
                            <select ref='eventCenterId' className="form-control" name="eventcenter" id="eventCentre" required onChange={this.handleLocation}>
                                <option>Please select center</option>
                                {this.props.getAllCentersState.map((centers, i) => {
                                return <option key={i} i={i} value={centers[0].name}>{centers[0].name}</option>})}
                            </select>

                        </div>

                        <div className="form-group">
                            <label htmlFor="location"> Location:</label>
                            <input type="text" id="location" required className="form-control" readOnly placeholder="London bridge" aria-describedby="helpId" required />
                        </div>

                        <div className="form-group">
                            < label htmlFor = "eventdate" > Event Date : </label>
                            <input type="date" id="eventdate" className="form-control" placeholder="12/22/2017" aria-describedby="helpId" required /><br />
                            <span id='dateAvailable' className='text-danger'></span>                           
                        </div>
                        <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                            <h4 className="text-white"><i className="fa fa-save" aria-hidden="true"></i></h4>
                        </button>

                        {/* {/* <!-- Viewing all booking at a particular date --> */}
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target="#exampleModal">
                            <h6 className="text-white"><i className="fa fa-address-card-o" aria-hidden="true"></i> VIEW BOOKINGS </h6>
                        </button>


                                {/* <!-- Modal --> */}
                        <div className="modal fade text-dark" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h5 className="modal-title " id="exampleModalLabel">Bookings</h5>

                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                <div className="modal-body text-dark">
                                    {/* <!-- create a column to view bookings of a particular date --> */}
                                    <div className="row">
                                    {/* <!-- First Column comprise of the search options --> */}
                                        <div className="col-md-12 col-sm-12">
                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="selecteventcentre">Event Centre</label>
                                                    <select className="form-control" name="" id="selecteventcentre" required>
                                                        <option>Select a center</option>
                                                        {this.props.getAllCentersState.map((centers, i) => <option key={i} i={i} value={centers[0].name}>{centers[0].name}</option>)};

                                                    </select>

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="bookingdates">Choose a booking date</label>
                                                    <input type="date" id="bookingdates" className="form-control" placeholder="" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>

                                </div>
                            </div>
                        </div>
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
  getAllCentersState: state.centerState,
  addNewEventState: state.eventState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  addNewEvent: addEventAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventHomePage);

