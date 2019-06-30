import React from 'react'
import Chart from 'react-apexcharts'
import { useStoreState } from 'easy-peasy'

function Plot() {
  const data = useStoreState(state => state.simulation.graphData)
  if (data.concentrationData) {
    return (
      <Chart
        options={{
          chart: {
            id: 'apexchart-example',
          },
          xaxis: {
            type: 'numeric',
            tickAmount: 10,
          },
        }}
        series={data.concentrationData}
        type="line"
        width={550}
        height={600}
      />
    )
  } else return <div />
}

export default Plot
