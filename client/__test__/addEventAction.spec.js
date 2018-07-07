import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import addEventAction from '../src/action/addEventAction';
import { ADD_AN_EVENT, ERROR_MESSAGE } from '../src/common/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('Add Event action creators', () => {
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


  it('should dispatch add event action success message', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {

          eventDetails: newEventDetails,

        },
      });
    });

    const expectedResponse =
      {
        type: ADD_AN_EVENT,
        payload: newEventDetails,
      };

    store.dispatch(addEventAction(newEventDetails))
      .then(() => {
        expect(store.getActions()[0]).toEqual({ type: 'check_page_loading_status' });
        expect(store.getActions()[1]).toEqual(expectedResponse);
        expect(store.getActions()[2]).toEqual({ type: 'status_success' });
        done();
      });
  });

  it('should dispatch error message when there is an error', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {

          eventDetails: newEventDetails,

        },
      });
    });

    const expectedResponse =
      {
        type: ADD_AN_EVENT,
        payload: newEventDetails,
      };

    store.dispatch(addEventAction(newEventDetails))
      .then(() => {
        expect(store.getActions()[4]).toEqual({ type: ERROR_MESSAGE });
        done();
      });
  });
});

