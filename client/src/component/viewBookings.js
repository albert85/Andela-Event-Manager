import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';
import ViewBookingHeaderComponent from '../component/ViewBookingHeaderComponent';
import CentreEventList from '../component/CentreEventList';
import Footer from '../component/Footer';
import CentreEventTable from './CentreEventTable';

export class BookingDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            centreLocation: "",
            centreCapacity:"",
            centreAmount:"",
            centreName:""
        }
        this.handleLocation = this.handleLocation.bind(this);
    }

    componentDidMount() {
        this.props.getAllCenterAction();
    }

    handleLocation(e) {
        // this.setState({centreName: e.})
        // console.log(e.target.value);
        if (e.target.value !== 'Please select center') {
            this.props.centerState.map((center) => {
                if (e.target.value  === center.name) {
                    this.props.getACenterAction(center.id);
                    this.setState({centreLocation: center.location});
                    this.setState({centreCapacity: center.capacity});
                    this.setState({centreAmount: center.amount});
                }
        
            });
        }
        if (e.target.value  === 'Please select center') {
                    this.setState({centreLocation: ''});
                    this.setState({centreCapacity: ''});
                    this.setState({centreAmount: ''});
        }
        return false;
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
                                            <select ref='eventCenterId'
                                                className="form-control"
                                                id="centerName"
                                                required
                                                onChange={this.handleLocation}>

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
                                            value={this.state.centreLocation}/>
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
                                            placeholder="Capacity" 
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
                                        <h4>EVENTS</h4>
                                    </div>

                                    <div className="eventlist bg-primary text-center text-dark p-3" >
                                        <CentreEventTable getCentreEvent={this.props.getACenterState} />
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllCenterAction,
    getACenterAction,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);
