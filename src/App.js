import React from 'react'
import QueryExecutor from './components/QueryExecutor/QueryExecutor'
import QueryResult from './components/QueryResult/QueryResult'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'


const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__rightSection">
        <QueryExecutor />
        <QueryResult />
      </div>
    </div>
  )
}

export default App