import * as Types from "../types"
import Validate from "../../lib/validate"
import orgService from "../../services/orgService"
import * as topicActions from "./topicActions"
import { Error } from "../../models"

export function load() {
  return async (dispatch, getState) => {
    dispatch({type: Types.ORGS_LOAD_REQUEST});

    try {
      var result = await orgService.load();
      dispatch({type: Types.ORGS_LOAD_SUCCESS, payload: result});
    }
    catch (e) {
      console.log(e)

      dispatch({type: Types.ORGS_LOAD_FAILURE, payload: Error.fromException(e)});
    }
  }
}

export function loadMembers(org) {
  return async (dispatch, getState) => {
    dispatch({type: Types.MEMBERS_LOAD_REQUEST});

    try {
      var result = await orgService.loadMembers(org);
      dispatch({type: Types.MEMBERS_LOAD_SUCCESS, payload: result});
    }
    catch (e) {
      dispatch({type: Types.MEMBERS_LOAD_FAILURE, payload: Error.fromException(e)});
    }
  }
}

export function setCurrent(org) {
  return async (dispatch, getState) => {

    dispatch({type: Types.ORGS_SET_CURRENT, payload: org});
    dispatch(loadMembers(org));
    dispatch(topicActions.load(true));

  }
}