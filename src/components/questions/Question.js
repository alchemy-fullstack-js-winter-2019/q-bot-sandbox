import React from 'react';
import { addSolved } from '../../actions/questions';
const moment = require('moment');
moment().format();

export default function Question({questionObj, handleClick}) {
  const { id, name, question, TA, timestamp, solved = false } = questionObj;
  const date = new Date(timestamp * 1000);
  // the following string is the Slack Bot user ID to replace:
  const quest = question.replace(/^<@UHEMKNNPP>/g, '');

  let end = moment(date);
  const waitTime = moment(end).toNow(true);

  return (
    <tr key={id} className={solved === true ? 'tableRow solvedTrue' : 'tableRow'}>
      <td className={'tableData'}>{name}</td>
      <td className={'tableData'}>{quest}</td>
      <td className={'tableData'}><p>{date.toLocaleString().split(',').join('')}</p> <span className={(TA !== undefined ? 'Solved' : '')}>Waiting: {waitTime}</span></td>
      <td className={'tableData'}>
        {TA}
        <button 
          onClick={handleClick.bind(null, id)} 
          className={'taButton' + (TA !== undefined ? 'Active' : '')}>
        </button>
      </td>
      <td className={'tableData'} id={'solvedColumn'}>
        <input type='checkbox' name='solvedValue' 
          checked={solved}
          value={solved}
          onChange={({ target }) => addSolved(target.checked, id)}
        />
      </td>
    </tr>
  )
}
