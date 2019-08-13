import { api } from '../api/api';
import { getApiReponseData, getApiPagedReponseData, buildApiErrorObject, buildApiQueryString } from '../utils';
import { CREATE_EVENT, FETCH_EVENTS, FETCH_EVENT, EDIT_EVENT, ARCHIVE_EVENT, SHOW_ERROR_DIALOG_MODAL } from './types';

export const fetchEvents = (name, page, pageSize) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get(`/events/?${buildApiQueryString(name, page, pageSize)}`)
      .then(response => {
        const data = getApiReponseData(response);
        dispatch({ type: FETCH_EVENTS, payload: data });

        resolve(getApiPagedReponseData(response).pageCount);
      })
      .catch(e => {
        dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
        reject(e);
      });
  });
};

export const createEvent = formValues => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post('/events', formValues)
      .then(response => {
        const data = getApiReponseData(response);
        dispatch({ type: CREATE_EVENT, payload: data });

        resolve();
      })
      .catch(e => {
        dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
        reject(e);
      });
  });
};

export const editEvent = (id, formValues) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .put(`/events/${id}`, formValues)
      .then(response => {
        const data = getApiReponseData(response);
        dispatch({ type: EDIT_EVENT, payload: data });

        resolve();
      })
      .catch(e => {
        dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
        reject(e);
      });
  });
};

export const fetchEvent = id => dispatch => {
  return new Promise((resolve, reject) => {
    // try {
    //   const response = await api.get(`/events/${id}`);
    //   const data = getApiReponseData(response);
    //   dispatch({ type: FETCH_EVENT, payload: data });

    //   resolve();
    // } catch (e) {
    //   dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
    //   reject(e);
    // }

    api
      .get(`/events/${id}`)
      .then(response => {
        const data = getApiReponseData(response);
        dispatch({ type: FETCH_EVENT, payload: data });

        resolve();
      })
      .catch(e => {
        dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
        reject(e);
      });
  });
};

export const archiveEvent = event => dispatch => {
  return new Promise((resolve, reject) => {
    // try {
    //   event = { ...event, isActive: false };

    //   const response = await api.put(`/events/${event.id}`, event);
    //   const data = getApiReponseData(response);
    //   dispatch({ type: ARCHIVE_EVENT, payload: data });

    //   resolve();
    // } catch (e) {
    //   dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
    //   reject(e);
    // }

    event = { ...event, isActive: false };
    api
      .put(`/events/${event.id}`, event)
      .then(response => {
        const data = getApiReponseData(response);
        dispatch({ type: ARCHIVE_EVENT, payload: data });

        resolve();
      })
      .catch(e => {
        dispatch({ type: SHOW_ERROR_DIALOG_MODAL, payload: buildApiErrorObject(e.response) });
        reject(e);
      });
  });
};
