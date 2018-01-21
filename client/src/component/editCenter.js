import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getAllCenterAction from '../action/getAllCentersAction';
import editACenterAction from '../action/editACenterAction';

class Center extends Component {
  constructor(props) {
    super(props);

    this.data = {
      centerIdNo: 0,
    };

    this.handleEditCenterDetails = this.handleEditCenterDetails.bind(this);
  }

  componentDidMount() {
    this.props.getAllCenters();
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

    // window.document.getElementById('eventnameEdit').value = '';
    // window.document.getElementById('eventcenterlocationEdit').value = '';
    // window.document.getElementById('eventcentercapacityEdit').value = '';
    // window.document.getElementById('eventcenteramountEdit').value = '';
    // if (localStorage.getItem('message') === 'sucessful') {
    //     // return window.document.getElementById('addNewCenterFormEdit').reset();
    //     // return this.setState({ edittingMode: false });
    // }

    // console.log(this.state.centerIdNo);
  }
  // Calling props from centerTableRow component (Child)
  handleCenterDetails(centerId) {
    this.setState({ centerIdNo: centerId });
    this.props.centerState.map((center) => {
      if (center.id === centerId) {
        window.document.getElementById('eventnameEdit').value = center.name;
        window.document.getElementById('eventcenterlocationEdit').value = center.location;
        window.document.getElementById('eventcentercapacityEdit').value = center.capacity;
        window.document.getElementById('eventcenteramountEdit').value = center.amount;
      }
    });
  }

  render() {
    return (
        <div>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCenters: getAllCenterAction,
  editACenterAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Center);

