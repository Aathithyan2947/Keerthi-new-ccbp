import './index.css'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

export default function LinearChart({data}) {
  return (
    <>
      <div className="CommitsPerQuaterGraphHeading">
        <h1>Analysis</h1>
      </div>
      <div className="CommitsPerQuaterGraphContainer">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#3B82F6" strokeDasharray="0 0" />
          <XAxis stroke="#3B82F6" dataKey="name" />
          <YAxis stroke="#3B82F6" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="commits"
            stroke="#3B82F6"
            activeDot={{r: 8}}
          />
        </LineChart>
        <p className="CommitsPerQuaterGraph">Commits Per Quarter</p>
      </div>
    </>
  )
}
