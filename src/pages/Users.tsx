import { Table } from 'antd'
import React from 'react'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const data = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney' },
]

const Users: React.FC = () => <Table columns={columns} dataSource={data} />

export default Users
