import React from 'react';

const EventHomePageHeader = () => (
    <div className="bg-primary container-fluid p-2 text-center">
        <div className="row">
            <div className="col">
                <h4>EVENT MANAGEMENT</h4>
            </div>

            <div className="col">
                <ul className="nav justify-content-end">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            ariahaspopup="true"
                            aria-expanded="false">
                            <i className="fa fa-cog"></i> Setting</a>

                        <div className="dropdown-menu">
                            <a href="/" className="dropdown-item"> Sign Out</a>
                            <a className="dropdown-item" href="/edit-event"> Edit Event</a>
                            <a className="dropdown-item" href="/booking-details" > Booking</a>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

    </div>
);

export default EventHomePageHeader;