import { applyMiddleware, combineReducers, createStore } from "redux";
import { chartReducer } from "./reducers/chart";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  chartReducer: chartReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
