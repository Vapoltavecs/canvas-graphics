const SET_CHART = "SET_CHART";

const initialState = {
  chart: undefined
}

export const chartReducer = (state = initialState, action) => {
  if (action.type === SET_CHART) return { ...state, chart: action.payload };
  return state;
};

export const chartAction = (payload) => ({ type: SET_CHART, payload });
