import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropType from 'prop-types';
import PaginationComponent from 'react-js-pagination';

import getAllCenterAction from '../action/getAllCentersAction';
import addEventAction from '../action/addEventAction';
import getUsersAllEventAction from '../action/getUsersAllEventAction';
import deleteAnEventAction from '../action/deleteAnEventAction';
import ModalComponent from './modalComponent/ModalComponent';
import DisplayLoading from './helpers/LoadingBar';


import '../../style.scss';
import Footer from './Footer';
import EventHomePageHeader from './EventHomePageHeader';

export class EventHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addEventDetails: {
        eventName: '',
        eventLocation: 'Location',
        eventVenue: 'Please select center',
        eventDate: '',
      },
      eventLocation: '',
      eventCentreName: '',
      pageNo: localStorage.getItem('PageNos'),
      currentPage: 1,
      currentCenterPage: 1,
      centerId: 1,
      eventCounts: 0,
      recordLimit: 2,
      checkifAnyRecordExist: false,
    };

    this.handleEventName = this.handleEventName.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCenterPagination = this.handleCenterPagination.bind(this);
    this.handleSelectCenter = this.handleSelectCenter.bind(this);
  }


  componentDidMount() {
    this.props.getAllCenters(1, this.state.recordLimit);

    this.props.getUsersAllEventAction(1, localStorage.getItem('userIdNo'), 1);
    if (this.props.eventState.length > 0) {
      this.setState({ ...this.state, checkifAnyRecordExist: true });
    }
  }

  handleSelectCenter(e) {
    this.props.centerState.map((item) => {
      if (Number(e.target.id) === item.id) {
        this.props.getUsersAllEventAction(item.id, localStorage.getItem('userIdNo'), 1);
        this.setState({ ...this.state, centerId: item.id, addEventDetails: { ...this.state.addEventDetails, eventVenue: item.name, eventLocation: item.location } });
      }
      return item;
    });
  }

  handleCenterPagination(pageNumNo) {
    this.setState({ ...this.state, currentCenterPage: pageNumNo });
    this.props.getAllCenters(pageNumNo, this.state.recordLimit);
  }

  handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  handlePagination(pageNum) {
    this.setState({ currentPage: pageNum });
    this.props.getUsersAllEventAction(this.state.centerId, localStorage.getItem('userIdNo'), pageNum);
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
    this.props.deleteAnEventAction(index)
      .then(() => {
        // // call api to refresh stateeventCounts
        this.props.getUsersAllEventAction(localStorage.getItem('userIdNo'), 1);
        this.setState({ ...this.state, currentPage: 1 });
      });
    if (this.props.eventState.length === 0) {
      this.setState({ ...this.state, checkifAnyRecordExist: false });
    }
    return true;
  }

  handleAddEvent(eventDetails) {
    //   prevent submitting automatically
    eventDetails.preventDefault();

    // get event details
    const eventToAdd = {
      name: this.state.addEventDetails.eventName,
      bookingStatus: 1, // 0 signifies booking cancel while 1 signifies booking booked
      centerId: this.state.centerId,
      eventDate: this.state.addEventDetails.eventDate,
    };

    // Add new event
    this.props.addNewEvent(eventToAdd)
      .then(() => {
        // call api to refresh state
        this.props.getUsersAllEventAction(this.state.centerId, localStorage.getItem('userIdNo'), 1);
      });

    this.setState({
      addEventDetails: Object.assign(this.state.addEventDetails, {
        eventName: '',
        eventLocation: 'Location',
        eventVenue: 'Please select center',
        eventDate: '',

      }),
    });

    if (this.props.eventState.length > 0) {
      this.setState({ ...this.state, checkifAnyRecordExist: true });
    }
  }


  render() {
    return (

            <div >
                <EventHomePageHeader
                handleLogout = { this.handleLogout }
                />

                {/* Create two columns for the management content */}
                {/* create a section  */}
                <div className="section">
                    < div className="section-cover-user" >
                        <div className="container">
                            <div className="row event-body">

                                <div className="col-md-7 col-sm-12 mb-4 pt-2">
                                    <div className="text-center bg-danger text-white p-2 mb-2">
                                        <h4>
                                        {
                                            this.props.messageStatus.checkStatus.isLoading && (<DisplayLoading/>)
                                        }
                                            EVENTS
                                        </h4>
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

                                                {
                                                    !this.props.centerPageNo.checkIfRecordExist && (<p>No Record Exist</p>)
                                                }

                                                {/* populate the row of the table with events */}
                                                {

                                                    // map through array of events and insert into the rows of the table
                                                    this.props.centerPageNo.checkIfRecordExist && (this.props.eventState.map((event, index) =>

                                                        // return the rows generated
                                                        <tr key={index} index={index} addre={event.id} className="border border-white">
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{event.name}</td>
                                                            <td>{this.props.centerState.map((center) => {
                                                                if (center.id === event.centerId) {
                                                                    return center.name;
                                                                }
                                                                return center;
                                                            })}</td>
                                                            <td>{this.props.centerState.map((center) => {
                                                                if (center.id === event.centerId) {
                                                                    return center.location;
                                                                }
                                                                return center;
                                                            })}</td>
                                                            <td>{event.eventDate}</td>
                                                            {(event.bookingStatus === 1) ? <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}

                                                            <td>
                                                                <div className="row">


                                                                    {/* Execute delete operation */}
                                                                    <div className="col"><button type="button" onClick={this.handleDeleteEvent.bind(this, event.id)} className="btn btn-danger btn-block">
                                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                    </button></div>
                                                                </div>

                                                            </td>

                                                        </tr>))
                                                }

                                            </tbody>

                                        </table>
                                    </div>
                                    {
                                        this.props.centerPageNo.checkIfRecordExist &&
                                    (<PaginationComponent
                                        activePage={this.state.currentPage}
                                            itemsCountPerPage={this.state.recordLimit}
                                            totalItemsCount={this.props.centerPageNo.totalNumOfPages}
                                            pageRangeDisplayed={5}
                                            itemClass = "page-item"
                                            linkClass = "page-link"
                                            onChange = {this.handlePagination}
                                        />)
                                        }


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
                                                placeholder="Event Name"
                                                value = {this.state.addEventDetails.eventName}
                                                defaultValue = ""
                                                onChange={this.handleEventName} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventCentre">Event Centre</label>
                                                <span >
                                                <input type="text"
                                                id="eventCentre"
                                                required
                                                className="form-control"
                                                value = {this.state.addEventDetails.eventVenue}
                                                placeholder="Select An Event Center"
                                                />
                                                <a className="btn btn-sm btn-primary text-white" data-toggle="modal" data-target="#selectCenter">SELECT</a>


                                            </span>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="location"> Location:</label>
                                            <input type="text"
                                                id="location"
                                                required
                                                className="form-control"
                                                readOnly
                                                placeholder="Location"
                                                value={this.state.addEventDetails.eventLocation}/>
                                        </div>

                                        <div className="form-group">
                                            < label htmlFor="eventdate" > Event Date : </label>
                                            <input type="date"
                                                id="eventdate"
                                                className="form-control"
                                                placeholder=""
                                                value = {this.state.addEventDetails.eventDate}
                                                required
                                                onChange={this.handleEventDate} /><br />
                                            <span id='dateAvailable' value = "" className='text-danger'></span>
                                        </div>
                                        <button type="submit"
                                        className="btn btn-success btn-sm btn-block mb-3">
                                            <h4 className="text-white"><i className="fa fa-save" aria-hidden="true"> Add Event</i></h4>
                                        </button>
                                    </form>

                                    <ModalComponent
                                    id="selectCenter"
                                    currentPage = {this.state.currentCenterPage}
                                    numOfPages={this.props.centerPaginationNum}
                                    centerArray = {this.props.centerState}
                                    handleCenterPagination = {this.handleCenterPagination}
                                    handleSelectCenter = {this.handleSelectCenter}
                                    />

                                </div>
                                </div>

                        </div>
                    </div>
                </div>

                <div className="section">
                    <Footer />
                </div>
            </div>
    );
  }
}

const mapStateToProps = state => ({
  centerState: state.centerState,
  eventState: state.eventState,
  centerPageNo: state.paginationNum,
  messageStatus: state.messageStatus,
  centerPaginationNum: state.centerPageNum,

});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  addNewEvent: addEventAction,
  getUsersAllEventAction,
  deleteAnEventAction,
}, dispatch);

EventHomePage.propType = {
  centerState: PropType.arrayOf(PropType.object),
  eventState: PropType.arrayOf(PropType.object),
  centerPaginationNum: PropType.object,
  messageStatus: PropType.object,
  getAllCenters: PropType.func.isRequired,
  addNewEvent: PropType.func.isRequired,
  getUsersAllEventAction: PropType.func.isRequired,
  deleteAnEventAction: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventHomePage);

