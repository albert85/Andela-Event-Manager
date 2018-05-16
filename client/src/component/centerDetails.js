import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';
import cancelBookingAction from '../action/cancelBookingAction';
import getUserEmailAction from '../action/getUserEmailAction';
import sendMailNotificationAction from '../action/sendMailNotificationAction';
import Footer from './Footer';
import CentreDetailsHeader from './CentreDetailsHeader';

export class CenterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centreAmount: '',
      centreCapacity: '',
      centreLocation: '',
    };
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

  handleLocation(e) {
    if (e.target.value !== 'Please select center') {
      this.props.centerState.map((center) => {
        if (e.target.value === center.name) {
          this.props.getACenterAction(center.id);
          this.setState({ centreAmount: center.amount, centreCapacity: center.capacity, centreLocation: center.location });
        }
      });
    }
    if (e.target.value === 'Please select center') {
      this.setState({ centreAmount: '', centreCapacity: '', centreLocation: '' });
    }
    return false;
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
                                            <select
                                            className="form-control"
                                            id="centerName" required onChange={this.handleLocation}>
                                                <option>Please select center</option>
                                                {this.props.centerState.map((center, i) => <option key={i} i={i} value={center.name}>{center.name}</option>)}
                                            </select>

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
                                                            <td scope="row">{i + 1}</td>
                                                            <td>{centers.name}</td>
                                                            <td>{centers.eventDate}</td>

                                                            {(centers.bookingStatus === 1) ? <td className="text-primary">Booked <i className="fa fa-book" aria-hidden="true"></i> </td> : <td className="text-danger">Canceled <i className="fa fa-close text-danger" aria-hidden="true"></i> </td>}
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col mb-2">
                                                                        <button type="button"
                                                                        className="btn btn-success btn-block"
                                                                        id="rebookingButton"
                                                                        index={i}
                                                                        onClick={this.handleReBooking.bind(this, centers.id)} >
                                                                            <i className="fa fa-book" aria-hidden="true"></i>
                                                                        </button>
                                                                    </div>
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

                <Footer />

            </div>
    );
  }
}

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
