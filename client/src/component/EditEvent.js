import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropType from 'prop-types';
import PaginationComponent from 'react-js-pagination';

import getAllCenterAction from '../action/getAllCentersAction';
import getUsersAllEventAction from '../action/getUsersAllEventAction';
import editAnEventAction from '../action/editAnEventAction';
import ModalComponent from './modalComponent/ModalComponent';
import DisplayLoading from './loadingBar/LoadingBar';


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
      currentPage: 1,
      eventItemsCountPerPage: 4,
      recordLimit: 2,
      currentCenterPage: 1,
      centerId: 1,
    };

    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleEventName = this.handleEventName.bind(this);
    this.handleEventLocation = this.handleEventLocation.bind(this);
    this.handleCenter = this.handleCenter.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleCenterPagination = this.handleCenterPagination.bind(this);
    this.handleSelectCenter = this.handleSelectCenter.bind(this);
  }


  componentDidMount() {
    this.props.getAllCenters(1, this.state.recordLimit);
    this.props.getUsersAllEventAction(1, localStorage.getItem('userIdNo'), 1);
  }

  /**
   * @description This method select the center where events are to be editted
   * @param {object} id
   * @returns {object} center
   */

  handleSelectCenter(e) {
    this.props.centerState.map((item) => {
      if (Number(e.target.id) === item.id) {
        this.props.getUsersAllEventAction(item.id, localStorage.getItem('userIdNo'), 1);
        this.setState({ ...this.state, centerId: item.id });
      }
      return item;
    });
  }

  /**
   * @description This method controls center pagination
   * @param {Integer} pageNum
   */

  handleCenterPagination(pageNumNo) {
    this.setState({ ...this.state, currentCenterPage: pageNumNo });
    this.props.getAllCenters(pageNumNo, this.state.recordLimit);
  }


  /**
   * @description This method handle change of event date and saves it to state
   * @param {Integer} eventDate
   * @returns {boolean}
   */

  handleEventDate(e) {
    this.setState({ editEventDate: e.target.value });
    return true;
  }

  /**
   * @description This method handle change of center's name and saves it to state
   * @param {object} centerName
   * @returns {boolean}
   */
  handleCenter(e) {
    this.setState({ editEventCenter: e.target.value });
    return true;
  }

  /**
   * @description This method handle change of event centre's location and saves it to state
   * @param {object} CenterLocation
   * @returns {boolean}
   */
  handleEventLocation(e) {
    this.setState({ editLocation: e.target.value });
    return true;
  }

  /**
   * @description This method handle change of event name and saves it to state
   * @param {object} eventName
   * @returns {boolean}
   */

  handleEventName(e) {
    this.setState({ editEventName: e.target.value });
    return true;
  }


  /**
   * @description This method handle moviong from one page to another for pagination
   * @param {Integer} pageNum
   */

  // handles pagination
  handlePagination(pageNum) {
    this.setState({ currentPage: pageNum });
    this.props.getUsersAllEventAction(localStorage.getItem('userIdNo'), pageNum);
  }

  /**
   * @description This method handle editing operation
   * @param {object} editDetails
   * @returns {boolean}
   */

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


  /**
   * @description This method handle getting the event to be edited
   * @param {Integer} index
   * @returns {boolean}
   */

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

                                                {
                                                    !this.props.centerPageNo.checkIfRecordExist && (<p>You don't any event here</p>)
                                                }

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

                                    <PaginationComponent
                                        activePage={this.state.currentPage}
                                            itemsCountPerPage={this.state.eventItemsCountPerPage}
                                            totalItemsCount={this.props.centerPageNo.totalNumOfPages}
                                            pageRangeDisplayed={5}
                                            itemClass = "page-item"
                                            linkClass = "page-link"
                                            onChange = {this.handlePagination}
                                        />

                                </div>

                                <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">

                                    <form className="p-2" onSubmit={this.handleEditEvent} id='addEventFormEdit' >
                                        <div className="bg-danger text-center text-white p-2 mb-3">
                                            <h4>
                                               {
                                                    this.props.messageStatus.checkStatus.isLoading && (<DisplayLoading/>)
                                                }
                                                EDIT EVENT
                                            </h4>
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
                                                <a className="btn btn-sm btn-primary text-white" data-toggle="modal" data-target="#selectCenter">SELECT</a>
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
                                        <button id="saveBtn" type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                            <h4 className="text-white"><i className="fa fa-save" aria-hidden="true"> Save</i></h4>
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

                <Footer />
            </div>
    );
  }
}

const mapStateToProps = state => ({
  centerState: state.centerState,
  eventState: state.eventState,
  centerPageNo: state.paginationNum,
  centerPaginationNum: state.centerPageNum,
  messageStatus: state.messageStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  getUsersAllEventAction,
  editAnEventAction,
}, dispatch);

EditEvent.PropType = {
  centerState: PropType.arrayOf(PropType.object),
  eventState: PropType.arrayOf(PropType.object),
  centerPageNo: PropType.object,
  messageStatus: PropType.object,
  centerPaginationNum: PropType.object,
  getAllCenters: PropType.func.isRequired,
  getAllCenterAction: PropType.func.isRequired,
  getUsersAllEventAction: PropType.func.isRequired,
  editAnEventAction: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);

