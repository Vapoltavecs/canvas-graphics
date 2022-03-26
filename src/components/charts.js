import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styledComponents from "styled-components";
import { Chart } from "./chart/chart";
import { getChart } from "../store/async/chart";

const CanvasWrap = styledComponents.div`
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    resize: horizontal;
    
`;

export const Charts = () => {
  const chart = useSelector((state) => state.chartReducer.chart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChart());
  }, []);
  
  return (
    <CanvasWrap>{chart ? <Chart chart={chart} /> : "loading...."}</CanvasWrap>
  );
};
