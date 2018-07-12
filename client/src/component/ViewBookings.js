import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from 'react-js-pagination';
import PropType from 'prop-types';
import toastr from 'toastr';

import DisplayLoading from './loadingBar/LoadingBar';
import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';
import ViewBookingHeaderComponent from '../component/ViewBookingHeaderComponent';
import SearchedCenter from '../action/searchCenter';
import Footer from '../component/Footer';
import CentreEventTable from './CentreEventTable';

export class BookingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centreLocation: '',
      centreCapacity: '',
      centreAmount: '',
      centreName: '',
      checkRecordIfExist: false,
      currentPage: 1,
      eventItemsCountPerPage: 4,
      checkifTableEmpty: false,
      centerId: 0,
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCenterLocation = this.handleCenterLocation.bind(this);
    this.handleCenterName = this.handleCenterName.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * @description This method sign out user from account
   */
  handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  /**
   * @description This method get and save centre location to the state
   * @param {object} centerLocation
   */
  handleCenterLocation(centerLocation) {
    this.setState({ centreLocation: centerLocation.target.value });
  }
  /**
   * @description This method handle pagination
   * @param {int} pageNum
   */
  // handles pagination
  handlePagination(pageNum) {
    this.setState({ currentPage: pageNum });
    this.props.getACenterAction(this.state.centerId, pageNum);
  }

  /**
   * @description This method handle saving center name into the state
   * @param {object} centerName
   */
  handleCenterName(centerName) {
    this.setState({ centreName: centerName.target.value });
  }

  /**
   * @description This method handle viewing of centre bookings
   */
  handleLocation() {
    if ((this.state.centreName).length !== 0 && (this.state.centreLocation).length !== 0) {
      // Don't display error
      this.setState({ displayNameError: false });
      this.setState({ displayLocationError: false });

      const centerToSearch = {
        name: this.state.centreName,
        location: this.state.centreLocation,
      };

      this.props.SearchedCenter(centerToSearch)
        .then(() => {
          if (this.props.centerState.length !== 0) {
            this.setState({ checkRecordIfExist: true });
            this.props.centerState.map((center) => {
              this.props.getACenterAction(center.id, 1);
              this.setState({ centerId: center.id });
              this.setState({ centreLocation: center.location });
              this.setState({ centreCapacity: center.capacity });
              this.setState({ centreAmount: center.amount });
            });
          } else {
            this.setState({ checkRecordIfExist: false });
            this.setState({ centreCapacity: '' });
            this.setState({ centreAmount: '' });
          }
        });
    } else {
      if (this.state.centreName.length === 0) {
        toastr.warning('Please Supply the Center\'s Name');
        toastr.clear();
      }

      if (this.state.centreLocation.length === 0) {
        toastr.warning('Please Supply the Center\'s Location');
        toastr.clear();
      }
    }
  }

  render() {
    return (
            <div>
                {/* Setup the header  */}
                <ViewBookingHeaderComponent handleLogout = {this.handleLogout} />
                {/* Create two columns for the management content  */}
                {/* create a section  */}
                <div className="section">
                    <div className="section-cover-viewcenter">
                        <div className="container event-body">
                            <div className="container">
                                <form>
                                <div className="form-row">
                                    <div className="col-5 form-inline">
                                    <input
                                    name="searchedCenter"
                                    className="form-control center-input-field"
                                    id="centerName"
                                    type="search"
                                    required
                                    onChange={this.handleCenterName}
                                    placeholder="Centre Name" />

                                    </div>
                                    <div className="col-5 form-inline">
                                    <input
                                    type="text"
                                    id="eventCenterLocation"
                                    name="searchedLocation"
                                    className="form-control center-input-field"
                                    onChange = {this.handleCenterLocation}
                                    value={this.state.centreLocation}
                                    placeholder="Centre Location" />

                                    </div>
                                    <div className="col">
                                    <button
                                    type="button"
                                    id="searchBtn"
                                    onClick={this.handleLocation}
                                    className="center-btn-search bg-primary text-white"
                                    > SEARCH </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">
                                    <form className="p-2 text-dark">
                                        <div className="bg-danger text-center text-white p-2 mb-3">
                                            <h4>VIEW CENTER DETAILS</h4>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="centerName">Center Name</label>

                                            <input type='search'
                                            name="searchedCenter"
                                                className="form-control"
                                                readOnly
                                                required
                                                placeholder = "Center name"
                                                value={this.state.centreName}
                                                />

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventCenterLocation"> Location:</label>
                                            <input type="text"
                                            readOnly
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
                                            placeholder="Capacity"
                                            value={this.state.centreCapacity}
                                             />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                            <input type="numbers"
                                            id="eventcenteramountEdit"
                                            className="form-control"
                                            readOnly
                                            placeholder="Amount"
                                            value={this.state.centreAmount}
                                            required />
                                        </div>

                                    </form>

                                </div>

                                <div className="col-md-7 col-sm-12 mb-4 pt-2">
                                    <div className="text-center bg-danger text-white p-2 mb-2">
                                        <h4>
                                            {
                                                this.props.messageStatus.checkStatus.isLoading && (<DisplayLoading/>)
                                            }
                                            EVENTS
                                        </h4>
                                    </div>

                                    <div className="eventlist bg-primary text-center text-dark p-3" >
                                        <CentreEventTable
                                        getCentreEvent={this.props.getACenterState}
                                        checkRecordIfExist = {this.state.checkRecordIfExist}
                                        />
                                    </div>

                                    {
                                      this.state.checkRecordIfExist && (<PaginationComponent
                                            activePage={this.state.currentPage}
                                                itemsCountPerPage={this.state.eventItemsCountPerPage}
                                                totalItemsCount={this.props.centerPageNo.totalNumOfPages}
                                                pageRangeDisplayed={5}
                                                itemClass = "page-item"
                                                linkClass = "page-link"
                                                onChange = {this.handlePagination}
                                            />)
                                    }


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
  centerPageNo: state.paginationNum,
  messageStatus: state.messageStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenterAction,
  getACenterAction,
  SearchedCenter,
}, dispatch);

BookingDetails.PropType = {
  centerState: PropType.arrayOf(PropType.object),
  getACenterState: PropType.arrayOf(PropType.object),
  centerPageNo: PropType.object,
  messageStatus: PropType.object,
  getAllCenterAction: PropType.func.isRequired,
  getACenterAction: PropType.func.isRequired,
  SearchedCenter: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);
