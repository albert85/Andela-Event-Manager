import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import editACenterAction from '../action/editACenterAction';
import Footer from './Footer';
import EditCenterHeader from './EditCenterHeader';

export class EditCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            centerIdNo: 0,
            centreName: "",
            centreLocation: "",
            centreAmount: "",
            centreCapacity: "",
        };

        this.handleEditCenterDetails = this.handleEditCenterDetails.bind(this);
        this.handleChangeCentreName = this.handleChangeCentreName.bind(this);
        this.handleChangeCentreLocation = this.handleChangeCentreLocation.bind(this);
        this.handleChangeCentreAmount = this.handleChangeCentreAmount.bind(this);
        this.handleChangeCentreCapacity = this.handleChangeCentreCapacity.bind(this);
    }

    componentDidMount() {
        this.props.getAllCenters();
    }

    // stores centre name
    handleChangeCentreName(e) {
        this.setState({ centreName: e.target.value });
    }

    // Stores Centre Location
    handleChangeCentreLocation(e) {
        this.setState({ centreLocation: e.target.value });
    }

    // Stores centreAmount
    handleChangeCentreAmount(e) {
        this.setState({ centreAmount: e.target.value });
    }

    // Stores centreAmount
    handleChangeCentreCapacity(e) {
        this.setState({ centreCapacity: e.target.value });
    }



    // Saving Centre Details
    handleEditCenterDetails(EditCenter) {
        EditCenter.preventDefault();

        const modifyCenter = {
            name: this.state.centreName,
            location: this.state.centreLocation,
            capacity: this.state.centreCapacity,
            amount: this.state.centreAmount,
        };

        this.props.editACenterAction(modifyCenter, this.state.centerIdNo);
    }

    //    Editing Centre Details
    handleCenterDetails(centerId) {
        this.setState({ centerIdNo: centerId });
        this.props.centerState.map((center) => {
            if (center.id === centerId) {
                this.setState({ centreName: center.name, centreLocation: center.location, centreCapacity: center.capacity, centreAmount: center.amount })
            }
        });
    }

    render() {
        return (
            <div>
                < EditCenterHeader />

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
                                                <tr className="p-3">
                                                    <th scope="col" className="border border-white"> S/N</th>
                                                    <th scope="col" className="border border-white">Center Name</th>
                                                    <th scope="col" className="border border-white">Location</th>
                                                    <th scope="col" className="border border-white">Booking Amount (#)</th>
                                                    <th scope="col" className="border border-white">Hall Capacity</th>
                                                    <th scope="col">View Center Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.centerState.map((centers, i) =>


                                                        <tr className="border border-white" key={i} >
                                                            <td scope="row">{i + 1}</td>
                                                            <td>{centers.name}</td>
                                                            <td>{centers.location}</td>
                                                            <td>{centers.amount}</td>
                                                            <td>{centers.capacity}</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col mb-2">
                                                                        <button type="button"
                                                                        id="editCenterDetails"
                                                                        onClick={this.handleCenterDetails.bind(this, centers.id)} className="btn btn-primary btn-block">
                                                                            <i className="fa fa-pencil" aria-hidden="true"> Edit</i>
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
                                    <form className="p-2" id='addNewCenterFormEdit'>
                                        <div className="bg-danger text-center text-white p-2 mb-3">
                                            <h4>EDIT EVENT CENTER</h4>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventnameEdit"> Name:</label>
                                            <input type="text"
                                                id="eventnameEdit"
                                                className="form-control"
                                                placeholder="Event Centre Name"
                                                onChange={this.handleChangeCentreName}
                                                value={this.state.centreName}
                                                required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenterlocationEdit"> Location:</label>
                                            <input type="text"
                                                id="eventcenterlocationEdit"
                                                className="form-control"
                                                value={this.state.centreLocation}
                                                onChange={this.handleChangeCentreLocation}
                                                placeholder="Event Centre Location"
                                                required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcentercapacityEdit"> Capacity:</label>
                                            <input type="numbers"
                                                id="eventcentercapacityEdit"
                                                className="form-control"
                                                placeholder="Event Centre Capacity"
                                                onChange={this.handleChangeCentreCapacity}
                                                value={this.state.centreCapacity}
                                                required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                            <input type="numbers"
                                                id="eventcenteramountEdit"
                                                className="form-control"
                                                placeholder="Amount for Booking"
                                                onChange={this.handleChangeCentreAmount}
                                                value={this.state.centreAmount}
                                                required />
                                        </div><br />

                                        <button type="submit"
                                            id="editButton"
                                            className="btn btn-success btn-sm btn-block mb-3"
                                            onClick={this.handleEditCenterDetails} >
                                            <h4 className="text-white">
                                                <i className="fa fa-save"></i> SAVE CENTER
                            </h4>
                                        </button>

                                        <a href="/centers" className="btn btn-danger btn-sm btn-block mb-3" >
                                            <h4 className="text-white">
                                                <i className="fa fa-close"></i> CLOSE
                            </h4>
                                        </a>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllCenters: getAllCenterAction,
    editACenterAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditCenter);

