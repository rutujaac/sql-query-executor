import React, { useState, Suspense, lazy, useEffect } from 'react'
import './Sidebar.css'
import queryList from '../../queries/queries.json'
import { useStateValue } from '../../context/StateProvider'
import Papa from 'papaparse'

const Sidebar = () => {

  const [rowData, setRowData] = useState([])
  const [{currentQuery, result, statusMessage}, dispatch] = useStateValue();

  const toggleQueries = (event) => {
   if(event.target.value !== "Select") {
    const queryExists = queryList.filter(item => item.query === event.target.value)[0]
    if(queryExists.result)  {
    const csvFile = require(`../../data/${queryExists.result}.csv`)
      Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: data => {
          dispatch({
            type: 'SET_QUERY',
            currentQuery: queryExists.query,
            result: data,
            statusMessage: queryExists.statusMsg
          })
        }
      })
    } else {
      dispatch({
        type: 'SET_QUERY',
        currentQuery: queryExists.query,
        result: null,
        statusMessage: queryExists.statusMsg
      })
    }
   }
  }


  return (
    <div className="sidebar">
      <p className="sidebar__optionLabel">Your queries</p>
      <select className="sidebar__dropdown" onChange={toggleQueries} value={currentQuery}>
        <option>Select</option>
        {queryList.map(item => {
          return <option className="sidebar__queries" key={item.query}>{item.query}</option>
        })}
      </select>
    </div>
  )
}

export default Sidebar