import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CenterTableRow from '../utility/centerTableRow';
import getAllCenterAction from '../action/getAllCentersAction';
import addNewCenterAction from '../action/addNewCenterAction';
import editACenterAction from '../action/editACenterAction';

class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edittingMode: false,
      centerIdNo: 0,
    };

    this.addNewCenter = this.addNewCenter.bind(this);
    this.handleEditCenter = this.handleEditCenter.bind(this);
    this.handleAddCenter = this.handleAddCenter.bind(this);
    this.handleEditCenterDetails = this.handleEditCenterDetails.bind(this);
  }

  componentDidMount() {
    this.props.getAllCenters();
  }

  handleSwitchingToEditMode() {
    this.setState({ edittingMode: true });
  }

  handleSwitchingToViewMode() {
    return this.props.history.push('/center-details');
  }

  handleCloseEdit() {
    return this.setState({ edittingMode: false });
  }

  handleEditCenterDetails(EditCenter) {
    EditCenter.preventDefault();

    const modifyCenter = {
      name: window.document.getElementById('eventnameEdit').value,
      location: window.document.getElementById('eventcenterlocationEdit').value,
      capacity: window.document.getElementById('eventcentercapacityEdit').value,
      amount: window.document.getElementById('eventcenteramountEdit').value,
    };

    this.props.editACenterAction(modifyCenter, this.state.centerIdNo);

    window.document.getElementById('eventnameEdit').value = '';
    window.document.getElementById('eventcenterlocationEdit').value = '';
    window.document.getElementById('eventcentercapacityEdit').value = '';
    window.document.getElementById('eventcenteramountEdit').value = '';
    // if (localStorage.getItem('message') === 'sucessful') {
    //     // return window.document.getElementById('addNewCenterFormEdit').reset();
    //     // return this.setState({ edittingMode: false });
    // }
    this.setState({ centerIdNo: this.state.centerIdNo });
    // console.log(this.state.centerIdNo);
  }
  // Calling props from centerTableRow component (Child)
  handleCenterDetails(centerId) {
    this.setState({ centerIdNo: centerId });
    console.log(centerId);
    this.props.centerState.map((center) => {
      if (center.id === centerId) {
        window.document.getElementById('eventnameEdit').value = center.name;
        window.document.getElementById('eventcenterlocationEdit').value = center.location;
        window.document.getElementById('eventcentercapacityEdit').value = center.capacity;
        window.document.getElementById('eventcenteramountEdit').value = center.amount;
      }
    });
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

    if (localStorage.getItem('message') !== 'successfully added') {
      return window.document.getElementById('addCenterMessage').innerHTML = 'Credential exist';
    }

    return window.document.getElementById('addNewCenterForm').reset();
  }

  handleEditCenter() {
    return (
                  <div>
                      <div className="bg-primary container-fluid p-2 text-center">
              <div className="row">
                 <div className="col">
                         <h3>EVENT CENTER MANAGEMENT</h3>
                 </div>

                 <div className="col">
                     <ul className="nav justify-content-end">
                         {/* <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                                 <div className="dropdown-menu">
                                     <a href="index.html" className="dropdown-item"> Sign Out</a>
                                     <a href="userpage.html" className="dropdown-item"> Home</a>
                                 </div>
                         </li> */}
                         <li className="nav-item"> <a href="/" className="text-white"> SIGNOUT <i className="fa fa-chevron-right"></i></a></li>
                     </ul>
                 </div>
              </div>

         </div>

           {/* Create two columns for the management content  */}
           {/* create a section  */}
          <div className="section">
              < div className = "section-cover-admin-home-page" >
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
                                            //   <CenterTableRow centerId = { centers.id } centers = {centers} key= {i} i ={i} handleCenterDetails = {this.handleCenterDetails} handleEditCenterDetails = {this.handleEditCenterDetails} { ...this.props } />)
                                            <tr className="border border-white" key={i} >
                                            <td scope="row">{ i + 1 }</td>
                                            <td>{centers.name}</td>
                                            <td>{centers.location}</td>
                                            <td>{centers.amount}</td>
                                            <td>{centers.capacity}</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col mb-2">
                                                        <button type="button" onClick = { this.handleCenterDetails.bind(this, centers.id) } className="btn btn-primary btn-block">
                                                        <i className="fa fa-pencil" aria-hidden="true"> Edit</i>
                                                        </button>
                                                    </div>
                                                        {/* <div className="col">
                                                            <button type="button" className="btn btn-success btn-block" onClick = { this.handleEditCenterDetails.bind(this, centers.id) }>
                                                                <i className="fa fa-book" aria-hidden="true"> Update</i>
                                                            </button>
                                                        </div> */}

                                                    </div>

                                            </td>

                                        </tr>,)
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
                                      <input type="text" id="eventnameEdit" className="form-control" placeholder="" aria-describedby="helpId" required />
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="eventcenterlocationEdit"> Location:</label>
                                      <input type="text" id="eventcenterlocationEdit" className="form-control" placeholder="" aria-describedby="helpId" required />
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="eventcentercapacityEdit"> Capacity:</label>
                                      <input type="numbers" id="eventcentercapacityEdit" className="form-control" placeholder="" aria-describedby="helpId" required/>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="eventcenteramountEdit"> Amount:</label>
                                      <input type="numbers" id="eventcenteramountEdit" className="form-control" placeholder="" aria-describedby="helpId" required/>
                                  </div><br />

                                  <button type="submit" className="btn btn-success btn-sm btn-block mb-3" onClick = { this.handleEditCenterDetails } >
                                      <h4 className="text-white">
                                          <i className="fa fa-save"></i> SAVE CENTER
                                      </h4>
                                  </button>

                                  <button type="button" className="btn btn-danger btn-sm btn-block mb-3" onClick = {this.handleCloseEdit.bind(this)} >
                                      <h4 className="text-white">
                                          <i className="fa fa-close"></i> CLOSE
                                      </h4>
                                  </button>

                                   {/* Viewing all booking at a particular date */}

                              </form>
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

  handleAddCenter() {
    return (
              <div>
                  <div className="bg-primary container-fluid p-2 text-center">
          <div className="row">
             <div className="col">
                     <h3>EVENT CENTER MANAGEMENT</h3>
             </div>

             <div className="col">
                 <ul className="nav justify-content-end">
                     {/* <li className="nav-item dropdown">
                             <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                             <div className="dropdown-menu">
                                 <a href="index.html" className="dropdown-item"> Sign Out</a>
                                 <a href="userpage.html" className="dropdown-item"> Home</a>
                             </div>
                     </li> */}
                     <li className="nav-item"> <a href="/" className="text-white"> SIGNOUT <i className="fa fa-chevron-right"></i></a></li>
                 </ul>
             </div>
          </div>

     </div>

       {/* Create two columns for the management content  */}
       {/* create a section  */}
      <div className="section">
          < div className = "section-cover-admin-home-page" >
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

                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                          this.props.centerState.map((centers, i) =>

                                              <tr id="#1" key={i} index = {i} className="border border-white">
                                                  <td scope="row">{ i + 1 }</td>
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
                          <form className="p-2" onSubmit={this.addNewCenter} id='addNewCenterForm'>
                              <div className="bg-danger text-center text-white p-2 mb-3">
                                  <h4>ADD NEW EVENT CENTER</h4>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="eventname"> Name:</label>
                                  <input type="text" id="eventname" className="form-control" placeholder="" aria-describedby="helpId" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="eventcenterlocation"> Location:</label>
                                  <input type="text" name="eventcenterlocation" className="form-control" placeholder="" aria-describedby="helpId" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="eventcentercapacity"> Capacity:</label>
                                  <input type="numbers" id="eventcentercapacity" className="form-control" placeholder="" aria-describedby="helpId" required/>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="eventcenteramount"> Amount:</label>
                                  <input type="numbers" id="eventcenteramount" className="form-control" placeholder="" aria-describedby="helpId" required/>
                              </div><br />
                              <span id="addCenterMessage"></span>

                              <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                  <h4 className="text-white">
                                      <i className="fa fa-save"></i> Add Center
                                  </h4>
                              </button>

                              <button type="button" className="btn btn-primary btn-sm btn-block mb-3" onClick = { this.handleSwitchingToEditMode.bind(this) } >
                                  <h4 className="text-white">
                                      <i className="fa fa-pencil"></i> Edit Centers
                                  </h4>
                              </button>

                              <button type="button" className="btn btn-primary btn-sm btn-block mb-3" onClick = { this.handleSwitchingToViewMode.bind(this) } >
                                  <h4 className="text-white">
                                      <i className="fa fa-pencil"></i> View Center Details
                                  </h4>
                              </button>

                               {/* Viewing all booking at a particular date */}

                          </form>
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

  render() {
    if (this.state.edittingMode) {
      return this.handleEditCenter();
    }
    return this.handleAddCenter();
  }
}

const mapStateToProps = state => ({
  centerState: state.centerState,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  addNewCenterAction,
  editACenterAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Center);

