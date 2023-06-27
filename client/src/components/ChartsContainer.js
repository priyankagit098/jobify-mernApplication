import React, { useState } from 'react'
import AreaCharts from './AreaCharts'
import BarCharts from './BarCharts'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useAppContext } from '../context/appContext'

const ChartsContainer = () => {
    const [barChart, setBarChart]=useState(true)
    const {monthlyApplications : data}=useAppContext()
    
  return (
    <Wrapper>
    <h4>Monthly Applications</h4>
    <button type="button" onClick={() => setBarChart(!barChart)}>{barChart? "AreaChart" : "BarChart"}</button>
       {
        barChart?  <BarCharts data={data}/> :
        <AreaCharts data={data}/>
       }
    </Wrapper>

  )
}

export default ChartsContainer