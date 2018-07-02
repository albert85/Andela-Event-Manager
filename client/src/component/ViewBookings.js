import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from 'react-js-pagination';
import PropType from 'prop-types';

import DisplayLoading from './helpers/LoadingBar';
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
      displayNameError: false,
      displayLocationError: false,
      currentPage: 1,
      eventItemsCountPerPage: 4,
      checkifTableEmpty: false,
      centerId: 0,
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleCenterLocation = this.handleCenterLocation.bind(this);
    this.handleCenterName = this.handleCenterName.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleCenterLocation(e) {
    this.setState({ centreLocation: e.target.value });
  }

  // handles pagination
  handlePagination(pageNum) {
    this.setState({ currentPage: pageNum });
    this.props.getACenterAction(this.state.centerId, pageNum);
  }


  handleCenterName(e) {
    this.setState({ centreName: e.target.value });
  }

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
        this.setState({ displayNameError: true });
        this.setState({ checkRecordIfExist: false });
      }

      if (this.state.centreLocation.length === 0) {
        this.setState({ displayLocationError: true });
        this.setState({ checkRecordIfExist: false });
      }
    }
  }

  render() {
    return (
            <div>
                {/* Setup the header  */}
                <ViewBookingHeaderComponent />
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
                                        <div className="form-inline">
                                            <input type='search'
                                            name="searchedCenter"
                                                className="form-control center-input-field"
                                                id="centerName"
                                                required
                                                placeholder = "Please select center"
                                                onChange={this.handleCenterName}/>

                                                {
                                                this.state.displayNameError && (<span className="text-danger"> Please Indicate Location</span>)
                                            }

                                                {/* <option>Please select center</option>
                                                {this.props.centerState.map((center, i) => <option key={i} i={i} value={center.name}>{center.name}</option>)} */}


                                        <button type="button" className="center-btn-search" onClick={this.handleLocation}>
                                        SEARCH
                                        </button>

                                        </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventCenterLocation"> Location:</label>
                                            <input type="text"
                                            id="eventCenterLocation"
                                            className="form-control"
                                            placeholder="Location"
                                            name="searchedLocation"
                                            onChange = {this.handleCenterLocation}
                                            value={this.state.centreLocation}/>
                                            {
                                                this.state.displayLocationError && (<span className="text-danger"> Please Indicate Location</span>)
                                            }
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
                                            placeholder="Amount"
                                            value={this.state.centreAmount}
                                            required />
                                        </div>

                                        <a className="btn btn-success btn-sm btn-block mb-3" href="/event-home-page">
                                            <h4 className="text-white">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                            </h4>
                                        </a>

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
