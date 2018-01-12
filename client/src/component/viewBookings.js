import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import getACenterAction from '../action/getACenterAction';

class BookingDetails extends Component {
  constructor(props) {
    super(props);
    this.handleLocation = this.handleLocation.bind(this)
  }

  componentDidMount() {
    this.props.getAllCenterAction();
  }

  handleLocation() {
    if (this.refs.eventCenterId.value !== 'Please select center') {
      this.props.centerState.map((center) => {
        if (this.refs.eventCenterId.value === center.name) {
          this.props.getACenterAction(center.id);
          window.document.getElementById('eventCenterLocation').value = center.location;
          window.document.getElementById('eventCenterCapacity').value = center.capacity;
          return window.document.getElementById('eventcenteramountEdit').value = center.amount;
        }
        window.document.getElementById('eventCenterLocation').innerHTML = 'London bridge';
      });
    }
    if (this.refs.eventCenterId.value === 'Please select center') {
      this.props.getACenterAction(100000);
      window.document.getElementById('eventCenterLocation').value = '';
      window.document.getElementById('eventCenterCapacity').value = '';
      return window.document.getElementById('eventcenteramountEdit').value = '';
    }
    return false;
  }

  render() {
    return (
            <div>
                {/* Setup the header  */}
    <div className="bg-primary container-fluid p-2 text-center">
        <div className="row">
           <div className="col">
                   <h3>EVENT CENTER MANAGEMENT</h3>
           </div>

           <div className="col">
               <ul className="nav justify-content-end">
                  
                   <li className="nav-item"> <a href="/" className="text-white"> SIGNOUT <i className="fa fa-chevron-right"></i></a></li>
               </ul>
           </div>
        </div>

   </div>

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
                            <select ref='eventCenterId' className="form-control" id="centerName" required onChange={this.handleLocation}>
                                <option>Please select center</option>
                                {this.props.centerState.map((center, i) => <option key={i} i={i} value={center.name}>{center.name}</option>)}
                            </select>

                        </div>

                            <div className="form-group">
                                <label htmlFor="eventCenterLocation"> Location:</label>
                                <input type="text" readOnly id="eventCenterLocation" className="form-control" placeholder="" aria-describedby="helpId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="eventCenterCapacity"> Capacity:</label>
                                <input type="text" readOnly id="eventCenterCapacity" className="form-control" placeholder="" aria-describedby="helpId" />
                            </div>

                            <div className="form-group">
                                  <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                  <input type="numbers" id="eventcenteramountEdit" className="form-control" placeholder="" aria-describedby="helpId" required/>
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
                            <table className="table-sm text-center table-hover mx-auto bg-white table-responsive-sm table-striped">
                                <thead className="text-center text-white bg-info border border-white" >
                                    <tr className="p-3">
                                        <th scope="col" className="border border-white"> S/N</th>
                                        <th scope="col" className="border border-white">Event </th>
                                        <th scope="col" className="border border-white">Event Date (YYYY-MM-DD)</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.getACenterState.map((centers, i) =>
                                            <tr id="#1" key={i} index = {i} className="border border-white">
                                                <td scope="row">{ i + 1 }</td>
                                                <td>{centers.name}</td>
                                                <td>{centers.eventDate}</td>

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

    <div className="section">
        <div className="footer p-1 bg-primary mt-0 text-center">
            <h4>&copy; 2017</h4>
        </div>
    </div>

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
