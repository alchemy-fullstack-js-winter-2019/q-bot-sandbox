import React, { useState } from 'react';
import { useFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import Header from './Header';
import './Questions.css';
import Question from './Question';
import FilterForm from './FilterForm';

 export default function Questions({ handleClick }) {
   const [filterValue, setFilterValue] = useState('')
   const channel = useFirestore(channelCollection.orderBy('timestamp', 'desc'), []).filter(c => {
      return c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())
   })

   const questionTableItems = channel && channel.map(doc => {
    return (
      <Question 
        questionObj={doc} 
        handleClick={handleClick} 
        key={doc.id} 
      />
    )
  })

  const headers = ['Name', 'Question', 'Timestamp', 'TA'];
  const headersList = headers.map((header, i) => {
    return (
      <th className={'tableHeader'} key={i}>
        {header}
      </th>
    )
  })

   return (
    <>
    <Header />
    {channel === null && <h1>Loading...</h1>}
    { channel && 
      <>
        <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
        <table className={'qBotTable'}>
          <thead>
            <tr>
              {headersList}
            </tr>
          </thead>
          <tbody>
            {questionTableItems}
          </tbody>
        </table> 
      </>
    }
  </>
  )
}
