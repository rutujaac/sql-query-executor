import React, { useState, useEffect, useRef } from 'react'
import './QueryExecutor.css'
import { useStateValue } from '../../context/StateProvider'
import queryList from '../../queries/queries.json'
import Papa from 'papaparse'

const QueryExecutor = () => {

  const [query, setQuery] = useState("")
  const [{currentQuery, result, statusMessage}, dispatch] = useStateValue()
  const inputRef = useRef(null)

  // Update query state value if currentQuery in context updates 
  useEffect(() => {
    setQuery(currentQuery)
  }, [currentQuery])

  const runQuery = async (e) => {
    if(query !== "") {
      console.log("Not null")
      const queryExists = queryList.filter(item => item.query === query)[0] 
      if(queryExists) {   
        console.log("Query exists"+queryExists.statusMsg)
        if(queryExists.result) {
        const csvFile = require(`../../data/${queryExists.result}.csv`)
        // Parse the csv file and set result data to contents of file
        Papa.parse(csvFile, {
          download: true,
          header: true,
          complete: data => {
            dispatch({
              type: 'SET_QUERY',
              currentQuery: query,
              result: data,
              statusMessage: queryExists.statusMsg
            })
          }
        })
      } else {
        // If query has no results, dispatch null as result
        dispatch({
          type: 'SET_QUERY',
          currentQuery: queryExists.query,
          result: null,
          statusMessage: queryExists.statusMsg
        })
    } }
    else {
      dispatch({
        type: 'SET_QUERY',
        currentQuery: query,
        result: null,
        statusMessage: "Please check the query again"
      })
      document.getElementById("queryInputField").focus()
    }
} else {
  document.getElementById("queryInputField").focus()
}
}

// Clears all the fields and result table
const clearInput = () => {
  setQuery("")
  dispatch({
    type: 'SET_QUERY',
    currentQuery: "",
    result: null,
    statusMessage: "Enter SQL query in the field above"
  })
}

// Triggers the file input dialog
const inputFile = () => {
  inputRef.current.click()
}

// Reads the contents of a text file and copies then into the query input text area
const getSelectedFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
        setQuery(text)
    };
    reader.readAsText(e.target.files[0])
}

  return (
    <div className="queryExecutor">
      <div className="queryExecutor__header">
        <button className="queryExecutor__purpleBtn" onClick={runQuery}>Run</button>
        <button className="queryExecutor__greyBtn" onClick={clearInput}>Clear</button>
        <input type="file" ref={inputRef} style={{display: 'none'}} onChange={getSelectedFile} />
        <button className="queryExecutor__greyBtn queryExecutor__importBtn" onClick={inputFile}>Import</button>
      </div>
      <textarea className="queryExecutor__queryInput" placeholder="Query..." files=".txt" id="queryInputField" value={query} onChange={(event) => {
        setQuery(event.target.value)
      }}></textarea>
      
    </div>
  )
}

export default QueryExecutor