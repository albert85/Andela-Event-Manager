import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from 'react-js-pagination';
import toastr from 'toastr';

import getAllCenterAction from '../action/getAllCentersAction';
import addNewCenterAction from '../action/addNewCenterAction';
import UploadCenterImage from '../action/uploadCenterImage';
import Footer from './Footer';
import CenterHomePageHeader from './CenterHomePageHeader';

export class Centers extends Component {
  constructor(props) {
    super(props);

    this.addNewCenter = this.addNewCenter.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeCapacity = this.handleChangeCapacity.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handlePagination = this.handlePagination.bind(this);

    this.state = {
      centerName: '',
      centerLocation: '',
      centerCapacity: '',
      centerAmount: '',
      checkRecordIfExist: false,
      currentPage: 1,
      recordLimit: 5,
      imageUpload: '',
      clearImagePath: '',
    };
  }

  componentDidMount() {
    this.props.getAllCenters(1, this.state.recordLimit)
      .then(() => {
        if (this.props.centerState.length > 0) {
          this.setState({ checkRecordIfExist: true });
        }
      });
  }

  // handles pagination
  handlePagination(pageNum) {
    this.setState({ currentPage: pageNum });
    this.props.getAllCenters(pageNum, this.state.recordLimit);
  }


  handleImageUpload(e) {
    const file = e.target.files[0];
    this.setState({ clearImagePath: e.target.value });
    // Create a form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.CLOUDINARY_PRESET}`);

    this.props.UploadCenterImage(formData)
      .then((res) => {
        this.setState({ imageUpload: res });
      });
  }

  handleChangeName(e) {
    return this.setState({ centerName: e.target.value });
  }

  handleChangeLocation(e) {
    return this.setState({ centerLocation: e.target.value });
  }

  handleChangeCapacity(e) {
    return this.setState({ centerCapacity: e.target.value });
  }

  handleChangeAmount(e) {
    return this.setState({ centerAmount: e.target.value });
  }


  addNewCenter(center) {
    center.preventDefault();
    if (this.state.imageUpload.length !== 0) {
      const newCenter = {
        name: center.target[0].value,
        location: center.target[1].value,
        capacity: center.target[2].value,
        amount: center.target[3].value,
        centerUrl: this.state.imageUpload,
      };
      this.props.addNewCenterAction(newCenter)
        .then(() => {
          this.setState({
            centerName: '',
            centerLocation: '',
            centerCapacity: '',
            centerAmount: '',
            clearImagePath: '',
          });

          this.props.getAllCenters(1, this.state.recordLimit);
        });
    } else {
      toastr.error('Please Reselect the image to upload and check your network');
    }
  }

  render() {
    return (
            <div>
                {/* Center Home Page Header */}
                <CenterHomePageHeader/>

                {/* Create two columns for the management content  */}
                {/* create a section  */}
                <div className="section">
                    < div className="section-cover-admin-home-page" >
                        <div className="container">
                            <div className="row event-body">

                                <div className="col-md-7 col-sm-12 mb-4 pt-2">
                                    <div className="text-center bg-danger text-white p-2 mb-2">
                                        <h3>EVENT CENTERS</h3>
                                    </div>

                                    <div className="eventlist bg-primary text-center text-dark p-3">
                                        <table className="table-sm text-center table-hover mx-auto bg-white table-responsive-sm table-striped">
                                            <thead className="text-center text-white bg-info border border-white">
                                            {/* Create columns for the center details table */}
                                                <tr className="p-3">
                                                    <th scope="col" className="border border-white"> S/N</th>
                                                    <th scope="col" className="border border-white">Center Name</th>
                                                    <th scope="col" className="border border-white">Location</th>
                                                    <th scope="col" className="border border-white">Booking Amount (#)</th>
                                                    <th scope="col" className="border border-white">Hall Capacity</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    // Populate the table with centers details
                                                    this.props.centerState.map((centers, i) =>

                                                        <tr id="#1" key={i} index={i} className="border border-white">
                                                            <td scope="row">{i + 1}</td>
                                                            <td>{centers.name}</td>
                                                            <td>{centers.location}</td>
                                                            <td>{centers.amount}</td>
                                                            <td>{centers.capacity}</td>
                                                        </tr>)
                                                }
                                                {

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                      this.state.checkRecordIfExist && (<PaginationComponent
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
                                {/* Create a form that will be used to enter new center details */}
                                    <form className="p-2" onSubmit={this.addNewCenter} id='addNewCenterForm'>
                                        <div className="bg-danger text-center text-white p-2 mb-3">
                                            <h4>ADD NEW EVENT CENTER</h4>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventname"> Name:</label>
                                            <input type="text"
                                            id="eventname"
                                            className="form-control"
                                            placeholder="Event Centre's name"
                                            value = {this.state.centerName}
                                            onChange = {this.handleChangeName}
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenterlocation"> Location:</label>
                                            <input type="text"
                                            name="eventcenterlocation"
                                            className="form-control"
                                            onChange = {this.handleChangeLocation}
                                            value = {this.state.centerLocation}
                                            placeholder="Event Centre's Location"
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcentercapacity"> Capacity:</label>
                                            <input type="numbers"
                                            id="eventcentercapacity"
                                            className="form-control"
                                            onChange = {this.handleChangeCapacity}
                                            value = {this.state.centerCapacity}
                                            placeholder="Capacity of the Centre"
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenteramount"> Amount:</label>
                                            <input type="numbers"
                                            id="eventcenteramount"
                                            className="form-control"
                                            onChange = {this.handleChangeAmount}
                                            value = {this.state.centerAmount}
                                            placeholder="Amount for Booking Centre for Event"
                                            required />
                                        </div>
                                        {
                                            <span id="addCenterMessage"></span>

                                        }

                                        <div className="form-group mb-3">
                                            <label htmlFor="eventcenteramount"> Upload Center Image:</label>
                                            <input type="file"
                                            id="eventcenterupload"
                                            className="form-control"
                                            value={this.state.clearImagePath}
                                            onChange={this.handleImageUpload}
                                            required />

                                        </div>

                                        <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                            <h4 className="text-white">
                                                <i className="fa fa-save"></i> Add Center </h4>
                                        </button>

                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
    );
  }
}

const mapStateToProps = state => ({
  centerState: state.centerState,
  centerPageNo: state.centerPageNum,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  addNewCenterAction,
  UploadCenterImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Centers);

