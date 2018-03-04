import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
// import Adapter from 'enzyme-adapter-react-16';

import addNewUser, { addNewUserAsync } from '../src/action/signUpAction';
import * as types from '../src/common/types';

describe('<signUpAction />', () => {
//   let wrapper;
  //   const props = {
  //     // addNewUserAsync: () => {},
  //     centerState: [],
  //     getAllCenters: () => {},
  //     getUsersAllEventAction: (event) => {},
  //     deleteAnEventAction: () => {},

  //   };


//   beforeEach(() => {
//     // wrapper = shallow(<signUpAction />);
//     // console.log(wrapper.instance());
//   });


  const userDetails = {
    firstName: 'Temitope',
    lastName: 'Ola',
    isAdmin: false,
    password: 'admin',
    email: 'you@yahoo.com',
  };

  it('Should users details for signing up', () => {
    const addNewUserAdd = addNewUserAsync(userDetails);
    expect(addNewUserAdd.payload).to.be.equal(userDetails);
    expect(addNewUserAdd.type).to.be.equal(types.ADD_NEW_USER);
  });

  it('Should users details for signing up', () => {
    const addNewUserAdd = addNewUser(userDetails);
    console.log(addNewUserAdd);
    // expect(addNewUserAdd).to.be.equal(userDetails);
    // expect(addNewUserAdd.type).to.be.equal(types.ADD_NEW_USER);
  });
});
