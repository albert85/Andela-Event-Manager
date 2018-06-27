import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropType from 'prop-types';

import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';
import getAllEventsAction from '../action/getAllEventsAction';
import cancelBookingAction from '../action/cancelBookingAction';
import getUserEmailAction from '../action/getUserEmailAction';
import sendMailNotificationAction from '../action/sendMailNotificationAction';
import Footer from './Footer';
import CentreDetailsHeader from './CentreDetailsHeader';
import ModalComponent from './modalComponent/ModalComponent';

export class CenterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centreName: '',
      centreAmount: '',
      centreCapacity: '',
      centreLocation: '',
      checkifAnyRecordExist: true,
      currentCenterPage: 1,
      recordLimit: 2,
      centerId: 0,
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCenterPagination = this.handleCenterPagination.bind(this);
    this.handleSelectCenter = this.handleSelectCenter.bind(this);
  }

  componentDidMount() {
    this.props.getAllCenterAction(1, this.state.recordLimit);

    this.props.getUserEmailAction();
  }


  handleSelectCenter(e) {
    // window.console.log('id', e.target.id);
    // window.console.log('center', this.props.centerState);
    this.props.centerState.map((item) => {
      if (Number(e.target.id) === item.id) {
        this.props.getAllEventsAction(item.id, 1);
        // window.console.log(item.id);
        this.setState({
          centerId: item.id,
          centreName: item.name,
          centreLocation: item.location,
          centreAmount: item.amount,
          centreCapacity: item.capacity,
        });
      }
      return item;
    });
  }

  handleCenterPagination(pageNumNo) {
    this.setState({ currentCenterPage: pageNumNo });
    this.props.getAllCenterAction(pageNumNo, this.state.recordLimit);
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

  handleLocation(e) {
    this.props.centerState.map((center) => {
      if (e.target.value === center.name) {
        this.props.getACenterAction(center.id);
        this.setState({ centreAmount: center.amount, centreCapacity: center.capacity, centreLocation: center.location });
      }
    });
  }

  render() {
    return (
            <div>
                {/* Setup the header  */}
                <CentreDetailsHeader />

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
                                            <input
                                            className="form-control"
                                            placeholder= "Select A Center"
                                            id="centerName"
                                            value={this.state.centreName}
                                            required
                                            onChange={this.handleLocation}/>
                                              <a className="btn btn-sm btn-primary text-white" data-toggle="modal" data-target="#selectCenter">SELECT</a>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventCenterLocation"> Location:</label>
                                            <input type="text"
                                            readOnly
                                            id="eventCenterLocation"
                                            className="form-control"
                                            placeholder="Location"
                                            value={this.state.centreLocation}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventCenterCapacity"> Capacity:</label>
                                            <input type="text"
                                            readOnly
                                            id="eventCenterCapacity"
                                            className="form-control"
                                            value={this.state.centreCapacity}
                                            placeholder="Capacity"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                            <input type="numbers"
                                            id="eventcenteramountEdit"
                                            className="form-control"
                                            placeholder="Amount"
                                            value={this.state.centreAmount}
                                            required />
                                        </div>

                                        <a className="btn btn-success btn-sm btn-block mb-3" href="/centers">
                                            <h4 className="text-white">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                            </h4>
                                        </a>

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


                                <div className="col-md-7 col-sm-12 mb-4 pt-2">
                                    <div className="text-center bg-danger text-white p-2 mb-2">
                                        <h4>EVENTS ACTIVITIES</h4>
                                    </div>

                                    <div className="eventlist bg-primary text-center text-dark p-3" >
                                    {
                                                    (!this.props.eventPageNo.checkIfRecordExist || !this.props.messageStatus.checkStatus.success) && (<p className="text-white">No Record Exist</p>)
                                                }
                                        {
                                                this.props.messageStatus.checkStatus.success && (<table className="table text-center table-hover mx-auto bg-white table-responsive-sm table-striped">
                                                    <thead className="text-center text-white bg-info border border-white">
                                                        <tr className="p-3">
                                                            <th scope="col" className="border border-white"> S/N</th>
                                                            <th scope="col" className="border border-white">Event name</th>
                                                            <th scope="col" className="border border-white">Event Date</th>
                                                            <th scope="col" className="border border-white">Booking Status</th>
                                                            <th scope="col">Cancel bookings</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            // If record exist, populate
                                                            (this.props.messageStatus.checkStatus.success) &&
                                                            (this.props.eventState.map((centers, i) =>
                                                                <tr id="#1" key={i} className="border border-white">
                                                                    <td scope="row">{i + 1}</td>
                                                                    <td>{centers.name}</td>
                                                                    <td>{centers.eventDate}</td>

                                                                    {(centers.bookingStatus === 1) ? <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}
                                                                    <td>
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <button type="button" className="btn btn-danger btn-block"
                                                                                index={i}
                                                                                id='cancelBookingBtn'
                                                                                onClick={this.handleCancelBooking.bind(this, centers.id)} >
                                                                                    <i className="fa fa-close" aria-hidden="true"></i>
                                                                                </button>
                                                                            </div>

                                                                        </div>

                                                                    </td>

                                                                </tr>))
                                                }

                                            </tbody>
                            
                                        </table>)
                                        }
                                    </div>

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
  getACenterState: state.getACenterState,
  messageStatus: state.messageStatus,
  userEmailState: state.userEmailState,
  eventPageNo: state.paginationNum,
  centerPaginationNum: state.centerPageNum,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenterAction,
  getACenterAction,
  cancelBookingAction,
  getUserEmailAction,
  sendMailNotificationAction,
  getAllEventsAction,
}, dispatch);

CenterDetails.propType = {
  centerState: PropType.arrayOf(PropType.object),
  eventState: PropType.arrayOf(PropType.object),
  getACenterState: PropType.arrayOf(PropType.object),
  userEmailState: PropType.arrayOf(PropType.object),
  eventPageNo: PropType.object,
  messageStatus: PropType.object.isRequired,
  getAllCenterAction: PropType.func.isRequired,
  getACenterAction: PropType.func.isRequired,
  cancelBookingAction: PropType.func.isRequired,
  getUserEmailAction: PropType.func.isRequired,
  sendMailNotificationAction: PropType.func.isRequired,
  getAllEventsAction: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
