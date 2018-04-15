import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import addNewCenterAction from '../action/addNewCenterAction';
import Footer from './Footer';
import CenterHomePageHeader from './CenterHomePageHeader';

export class Center extends Component {
    constructor(props) {
        super(props);

        this.addNewCenter = this.addNewCenter.bind(this);
    }

    componentDidMount() {
        this.props.getAllCenters();
    }


    addNewCenter(center) {
        center.preventDefault();
        const newCenter = {
            name: center.target[0].value,
            location: center.target[1].value,
            capacity: center.target[2].value,
            amount: center.target[3].value,
        };

        this.props.addNewCenterAction(newCenter);

        return true;
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
                                            </tbody>
                                        </table>
                                    </div>

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
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenterlocation"> Location:</label>
                                            <input type="text" 
                                            name="eventcenterlocation" 
                                            className="form-control" 
                                            placeholder="Event Centre's Location"
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcentercapacity"> Capacity:</label>
                                            <input type="numbers" 
                                            id="eventcentercapacity" 
                                            className="form-control" 
                                            placeholder="Capacity of the Centre"
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="eventcenteramount"> Amount:</label>
                                            <input type="numbers"
                                            id="eventcenteramount"
                                            className="form-control"
                                            placeholder="Amount for Booking Centre for Event" 
                                            required />
                                        </div><br />

                                        <span id="addCenterMessage"></span>

                                        <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                            <h4 className="text-white">
                                                <i className="fa fa-save"></i> Add Center
                            </h4>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllCenters: getAllCenterAction,
    addNewCenterAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Center);

