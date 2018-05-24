import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import getUsersAllEventAction from '../action/getUsersAllEventAction';
import editAnEventAction from '../action/editAnEventAction';


import '../../style.scss';
import EditEventHeader from './EditEventHeader';
import Footer from './Footer';

export class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editEventName: 'Event Name',
      editLocation: '',
      editEventDate: '',
      editEventCenter: 'Centre Name',
      editEventLocation: 'Centre Location',

    };

    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleEventName = this.handleEventName.bind(this);
    this.handleEventLocation = this.handleEventLocation.bind(this);
    this.handleCenter = this.handleCenter.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
  }


  componentDidMount() {
    this.props.getAllCenters();
    this.props.getUsersAllEventAction(localStorage.getItem('userIdNo'));
  }

  handleEventDate(e) {
    this.setState({ editEventDate: e.target.value });
    return true;
  }

  handleCenter(e) {
    this.setState({ editEventCenter: e.target.value });
    return true;
  }

  handleEventLocation(e) {
    this.setState({ editLocation: e.target.value });
    return true;
  }


  handleEventName(e) {
    this.setState({ editEventName: e.target.value });
    return true;
  }


  handleEditEvent(editDetails) {
    editDetails.preventDefault();

    this.props.centerState.map((center) => {
      if (this.state.editEventCenter === center.name) {
        localStorage.setItem('centerEditId', center.id);
        return center.id;
      }
    });

    const editDetailData = {
      name: this.state.editEventName,
      eventDate: this.state.editEventDate,
      centerId: Number(localStorage.getItem('centerEditId')),
    };

    this.props.editAnEventAction(editDetailData, Number(localStorage.getItem('index')), this.props.history);
  }


  handleStoringId(index) {
    localStorage.setItem('index', index);
    this.props.eventState.map((event) => {
      if (event.id === index) {
        this.setState({ editEventName: event.name });
        this.props.centerState.map((center) => {
          if (center.id === event.centerId) {
            this.setState({ editEventCenter: center.name, editEventLocation: center.location });
          }
          return center;
        });

        this.setState({ editEventDate: event.eventDate });
        // window.document.getElementById('eventdateEdit').value = event.eventDate;
      }
    });
    return true;
  }


  render() {
    return (
            <div >

                <EditEventHeader />

                {/* Create two columns for the management content */}
                {/* create a section  */}
                <div className="section">
                    < div className="section-cover-user" >
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

                                                        // return tthe rows generated

                                                        <tr key={index} index={index} addre={event.id} className="border border-white">
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
                                                            {(event.bookingStatus === 1) ? <td className="text-primary">Booked
                                                                <i className="fa fa-book" aria-hidden="true"></i>
                                                            </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}

                                                            <td>
                                                                <div className="row">

                                                                    {/* Execute edit operation */}
                                                                    <div className="col mb-2">
                                                                        <button type="button"
                                                                        id="editButton"
                                                                        onClick={this.handleStoringId.bind(this, event.id)}
                                                                        className="btn btn-success btn-block">
                                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
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

                                <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">

                                    <form className="p-2" onSubmit={this.handleEditEvent} id='addEventFormEdit' >
                                        <div className="bg-danger text-center text-white p-2 mb-3">
                                            <h4>EDIT EVENT</h4>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventnameEdit"> Event Name:</label>
                                            <input type="text"
                                                id="eventnameEdit"
                                                className="form-control"
                                                placeholder="Event Name"
                                                value={this.state.editEventName}
                                                onChange={this.handleEventName} />
                                        </div>


                                        <div className="form-group">
                                        <label htmlFor="eventCentreEdit">Event Centre</label>
                                            <input type="text"
                                                id="eventCentreEdit"
                                                className="form-control"
                                                readOnly
                                                placeholder="Event Centre"
                                                onChange={this.handleCenter}
                                                value={this.state.editEventCenter} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="locationEdit"> Location:</label>
                                            <input type="text"
                                                id="locationEdit"
                                                className="form-control"
                                                readOnly
                                                placeholder="Location"
                                                onChange={this.handleEventLocation}
                                                value={this.state.editEventLocation}/>
                                        </div>

                                        <div className="form-group">
                                            < label htmlFor="eventdateEdit" > Event Date : </label>
                                            <input type="date"
                                                id="eventdateEdit"
                                                className="form-control"
                                                placeholder="Event Date"
                                                onChange={this.handleEventDate}
                                                value={this.state.editEventDate}
                                            /><br />
                                            <span id='dateAvailableModal' className='text-danger'></span>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                            <h4 className="text-white"><i className="fa fa-save" aria-hidden="true"> Save</i></h4>
                                        </button>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
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
  getUsersAllEventAction,
  editAnEventAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);

