import React from "react";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useSelector } from "react-redux";

const StatsContainer = () => {
  const { defaultStats } = useSelector((store) => store.stats);
  return (
    <Wrapper>
      <StatItem
        count={defaultStats?.pending || 0}
        title="Pending Applications"
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        count={defaultStats?.interview || 0}
        title="Interviews Scheduled"
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
      <StatItem
        count={defaultStats?.declined || 0}
        title="Jobs Declined"
        icon={<FaBug />}
        color="#d66a6a"
        bcg="#ffeeee"
      />
    </Wrapper>
  );
};

export default StatsContainer;
