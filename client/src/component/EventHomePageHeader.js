import React from 'react';

const EventHomePageHeader = ({ handleLogout }) => (
    <div className="bg-primary container-fluid p-2 text-center">
        <div className="row">
            <div className="col">
                <h4 className="text-white">EVENT MANAGEMENT</h4>
            </div>

            <div className="col">
                <ul className="nav justify-content-end">
                    {
                        localStorage.getItem('role') === 'Admin' ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white"
                                    data-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    ariahaspopup="true"
                                    aria-expanded="false">Centers </a>
                                <div className="dropdown-menu">
                                     <a className="dropdown-item" href="/centers" id="addCenterNav"><i className="fa fa-plus-circle"></i>  Add Center</a>
                                     <a className="dropdown-item" href="/edit-center-details" id="editCenterNav"><i className="fa fa-edit"></i>  Edit Center</a>
                                    <a className="dropdown-item" href="/center-details" id="viewCenterNav"><i className="fa fa-search-plus"></i>  View Center</a>

                                </div>
                            </li>
                        : ''
                    }

                       <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            ariahaspopup="true"
                            aria-expanded="false">
                            <i className="fa fa-cog"></i> Setting</a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item" onClick={handleLogout} id="signoutNav"><i className="fa fa-sign-out"></i>  Sign Out</a>
                            <a className="dropdown-item" href="/edit-event" id="editEventNav"><i className="fa fa-edit"></i> Edit Event</a>
                            <a className="dropdown-item" href="/booking-details" id="bookingNav"><i className="fa fa-search-plus"></i> Booking</a>

                        </div>
                    </li>

                </ul>
            </div>
        </div>

    </div>
);

export default EventHomePageHeader;
