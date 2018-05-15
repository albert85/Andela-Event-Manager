import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import { mount } from 'enzyme';
import sinon from 'sinon';

import addEventAction, { addNewEventAsync } from '../src/action/addEventAction';
import { ADD_AN_EVENT } from '../src/common/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('Testing action creators', () => {
  const newEventDetails = {
    eventId: 1,
    name: 'Adenike Hall',
    location: 'Ikeja',
    eventDate: '2007-02-18',
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it('should dispatch action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: newEventDetails,
      });
    });

    const expectedResponse = [
      {
        type: ADD_AN_EVENT,
        payload: newEventDetails,
      },
    ];

    console.log(addEventAction(newEventDetails));

    store.dispatch(addEventAction(newEventDetails));
    // store.dispatch(addNewEventAsync(newEventDetails));

    // return of async actions
    expect(store.getActions()).toEqual([]);
  });
});

