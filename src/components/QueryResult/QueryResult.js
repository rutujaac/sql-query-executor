import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import './QueryResult.css'

const QueryResult = () => {

    const [{currentQuery,result,statusMessage}, dispatch] = useStateValue()

    const [columns, setColumns] = useState([])

    useEffect(() => {
        if(result) {
            setColumns(result?.meta?.fields)
        }
    }, [result])
   
    return (
        <div className="queryResult">
        <div className={`queryResult__statusMessage ${statusMessage==="Please check the query again" ? "queryResult__errorBox" : ""} `}>
            <p className="queryResult__statusText">{statusMessage ? statusMessage : "Enter SQL query in the field above"}</p>
        </div>
        <div className="queryResult__resultTableContainer">
            {result ? (<table className="fl-table">
            <thead>
            <tr>
               {
                   columns?.map(colName => {
                       return <th key={colName}>{colName}</th>
                   })
               }
            </tr>
            </thead>
            <tbody>
               {
                   result?.data?.map((rowC, index) => {
                       return (
                           <tr key={index}>
                               {
                                   columns?.map((col, i) => { 
                                       return (rowC[col] ?
                                           <td key={rowC[0]+""+i}>{rowC[col]}</td> : ""
                                       )
                                   })
                               }
                           </tr>
                       )
                   })
               }
            </tbody>
            </table>) : ("")}
            </div>
        </div>
    )
}

export default QueryResult