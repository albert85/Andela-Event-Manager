import React from 'react';

const CenterHomePageHeader = () => (
    <div className="bg-primary container-fluid p-2 text-center center-header">
                    <div className="row">
                        <div className="col">
                            <a className="nav-link" href="/centers"><h3 className="text-white">EVENT CENTER MANAGEMENT</h3></a>
                        </div>

                        <div className="col">
                            <ul className="nav justify-content-end">

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false"> <i className="fa fa-home"></i> Centers</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/edit-center-details" id="editCenterNav"><i className="fa fa-edit"></i>  Edit Center</a>
                                        <a className="dropdown-item" href="/center-details" id="viewCenterNav"><i className="fa fa-search-plus"></i> View Center</a>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false"><i className="fa fa-calendar"> </i> Events</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/event-home-page" id="addEventNav"><i className="fa fa-plus-circle" ></i> Add Event</a>
                                        <a className="dropdown-item" href="/edit-event" id="editEventNav"><i className="fa fa-edit"></i> Edit Event</a>
                                        <a className="dropdown-item" href="/booking-details" id="bookingNav"> <i className="fa fa-search-plus"></i> Booking</a>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" data-toggle="dropdown" href="#" role="button" ariahaspopup="true" aria-expanded="false"><i className="fa fa-user"></i> Profile</a>
                                    <div className="dropdown-menu">
                                        <a href="/" className="dropdown-item"><i className="fa fa-sign-out"></i> Sign Out</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
);
export default CenterHomePageHeader;
