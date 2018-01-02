import React, { Component } from 'react';

class Center extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: {}
        
        }
    }
    addNewCenter(center){
        center.preventDefault();
        alert("God win");
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
                    <div className="col-md-5 col-sm-12 pl-4 pr-4 pb-4 mb-3">
                        <form className="p-2" onSubmit={this.addNewCenter}>
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
                                <label htmlFor="eventcentercapacityamount"> Amount:</label>
                                <input type="numbers" id="eventcentercapacityamount" className="form-control" placeholder="" aria-describedby="helpId" required/>
                            </div>

                            <button type="submit" className="btn btn-success btn-sm btn-block mb-3">
                                <h4 className="text-white">
                                    <i className="fa fa-save"></i>
                                </h4>
                            </button>

                             {/* Viewing all booking at a particular date */}
                            
                        </form>
                    </div>


                    <div className="col-md-7 col-sm-12 mb-4 pt-2">
                        <div className="text-center bg-danger text-white p-2 mb-2">
                            <h3>EVENTS</h3>
                        </div>

                        <div className="scrollevent bg-primary text-center text-dark p-3" id="eventlist">
                            <table className="table-sm text-center text-dark table-hover bg-white mx-auto table-dark table-responsive-sm table-striped">
                                <thead className="text-center text-white bg-info border border-white">
                                    <tr className="p-3">
                                        <th scope="col" className="border border-white"> S/N</th>
                                        <th scope="col" className="border border-white">Event Center Name</th>
                                        <th scope="col" className="border border-white">Location</th>
                                        <th scope="col" className="border border-white">Capacity (nos) </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr id="#1" className="border border-white">
                                        <td scope="row">1</td>
                                        <td>Wedding</td>
                                        <td>Apollan</td>
                                        <td>500</td>

                                        <td>
                                            <div className="row">
                                                <div className="col mb-2">
                                                    <a href="#" className="btn btn-success btn-block">
                                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                                <div className="col">
                                                    <a href="#" className="btn btn-danger btn-block">
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                                <div className="col">
                                                    <a href="Viewcenter.html" className="btn btn-primary btn-block">
                                                        <i className="fa fa-street-view" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            </div>

                                        </td>

                                    </tr>
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

export default Center;