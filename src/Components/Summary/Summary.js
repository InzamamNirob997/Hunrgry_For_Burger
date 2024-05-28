import React from 'react'

const Summary = (props) => {
    const dataContent = props.data.map(item =>{
        return <li key={item.type}>
            <span style={{textTransform: "capitalize"}}>{item.type}</span> {item.amount}

        </li>
    })
  return (
    <div>
        <ul>
            {dataContent}

        </ul>
      
    </div>
  )
}

export default Summary
