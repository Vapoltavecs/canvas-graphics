import chart from "../../services/chart";
import { chartAction } from "../reducers/chart";

export const getChart = () => {
  console.log("sdfsdf");
  return async (dispatch) => {
    const charts = await chart.getChart();
    dispatch(chartAction(charts.data[0]));
  };
};
