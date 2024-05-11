import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChartContainer, StatsContainer } from "../../components";
import { getStats } from "../../feature/slice/statSlice";

const Stats = () => {
  const { monthlyApplications, isLoading } = useSelector(
    (state) => state.stats
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          <StatsContainer />
          {monthlyApplications.length > 0 && <ChartContainer />}
        </>
      )}
    </>
  );
};

export default Stats;
