import React from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import { useSelector } from 'react-redux';

const ChartContainer = () => {
    const [areaChart, toggleChart] = useState(false);
    const { monthlyApplications } = useSelector(state => state.stats);
  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button onClick={() => toggleChart(!areaChart)}>{areaChart ? 'Bar Chart' : 'Area Chart'}</button>
        {areaChart ? <AreaChart data={monthlyApplications} /> : <BarChart data={monthlyApplications} />}
    </Wrapper>
  )
}

export default ChartContainer;