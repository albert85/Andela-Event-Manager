import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import addNewCenterAction from '../action/addNewCenterAction';

class Center extends Component {
  constructor(props) {
    super(props);
    this.addNewCenter = this.addNewCenter.bind(this);
    this.handleEditCenter = this.handleEditCenter.bind(this);
    this.handleAddCenter = this.handleAddCenter.bind(this);

    this.state = {
      edittingMode: false,
    };
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

  handleEditCenterDetails(EditCenter) {
    EditCenter.preventDefault();
  }

  handleCenterDetails(centerId) {
    localStorage.setItem('centerId', centerId);
    return this.props.history.push('/center-details');
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

    if (localStorage.getItem('message') === 'successfully added') {
      return window.document.getElementById('addNewCenterForm').reset();
    }

    return window.document.getElementById('addCenterMessage').innerHTML = 'Credential exist';
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
                         <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                                 <div className="dropdown-menu">
                                     <a href="index.html" className="dropdown-item"> Sign Out</a>
                                     <a href="userpage.html" className="dropdown-item"> Home</a>
                                 </div>
                         </li>
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

                                                  <tr id="#1" key={i} index = {i} className="border border-white">
                                                      <td scope="row">{ i + 1 }</td>
                                                      <td>{centers.name}</td>
                                                      <td>{centers.location}</td>
                                                      <td>{centers.amount}</td>
                                                      <td>{centers.capacity}</td>

                                                      <td>
                                                          <div className="row">
                                                              <div className="col mb-2">
                                                                  <button type="button" onClick = { this.handleCenterDetails.bind(this, centers.id) } className="btn btn-success btn-block">
                                                                  <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                  </button>
                                                              </div>
                                                              {/* <div className="col">
                                                                  <a href="#" className="btn btn-danger btn-block">
                                                                      <i className="fa fa-close" aria-hidden="true"></i>
                                                                  </a>
                                                              </div> */}

                                                          </div>

                                                      </td>

                                                  </tr>)
                                          }
                                      </tbody>
                                  </table>
                              </div>

                          </div>

                          <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">
                              <form className="p-2" onSubmit={this.addNewCenter} id='addNewCenterFormEdit'>
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
                                  <span id="addCenterMessage"></span>

                                  <button type="submit" className="btn btn-success btn-sm btn-block mb-3" onClick = { this.handleEditCenterDetails.bind(this) } >
                                      <h4 className="text-white">
                                          <i className="fa fa-save"></i> Save Center
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
                     <li className="nav-item dropdown">
                             <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false">Setting</a>
                             <div className="dropdown-menu">
                                 <a href="index.html" className="dropdown-item"> Sign Out</a>
                                 <a href="userpage.html" className="dropdown-item"> Home</a>
                             </div>
                     </li>
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

                                                  {/* <td>
                                                      <div className="row">
                                                          <div className="col mb-2">
                                                              <button type="button" onClick = { this.handleCenterDetails.bind(this, centers.id) } className="btn btn-success btn-block">
                                                              <i className="fa fa-book" aria-hidden="true"></i>
                                                              </button>
                                                          </div>
                                                          <div className="col">
                                                              <a href="#" className="btn btn-danger btn-block">
                                                                  <i className="fa fa-close" aria-hidden="true"></i>
                                                              </a>
                                                          </div>

                                                      </div>

                                                  </td> */}

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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Center);

