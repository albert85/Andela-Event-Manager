import React from 'react';

const EditEventHeader = () => (
<div className="bg-primary container-fluid p-2 text-center">
                    <div className="row">
                        <div className="col">
                            <h3 className="text-white">EVENT MANAGEMENT</h3>
                        </div>

                        <div className="col">
                            <ul className="nav justify-content-end">
                                <li className="nav-item"> <a href="/event-home-page" className="text-white mr-1"> HOME | </a></li>
                                <li className="nav-item"> <a href="/" className="text-white">    SIGNOUT <i className="fa fa-chevron-right"></i></a></li>
                            </ul>
                        </div>
                    </div>

                </div>
);

export default EditEventHeader;
