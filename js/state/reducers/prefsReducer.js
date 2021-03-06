import { Org } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = true;
const PrefsState = Immutable.Record({
    org: new Org(),
    orgId: null
})

var initialState = new PrefsState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["prefs"]) {
        if (isPersistable) {
          state = new PrefsState().mergeDeep(action.payload["prefs"]);
        }
        else state = new PrefsState();
      }
      return state;  
    }

    case Types.PREFS_SET_ORG: {
      const org = action.payload;
      state = state.set("org", org).set("orgId", org.id)
      return state;
    }

    default:
      return state;
  }
}
