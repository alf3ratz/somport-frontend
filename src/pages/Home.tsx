import { Card } from 'antd'
import React from 'react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 3000 },
  { name: 'Mar', users: 2000 },
  { name: 'Apr', users: 2780 },
]

const Home: React.FC = () => (
  <Card title='Dashboard'>
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='users' stroke='#8884d8' activeDot={{ r: 8 }} />
    </LineChart>
  </Card>
)

export default Home
