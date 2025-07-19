import React, { useState } from 'react';

export default function DropdownBar({options, handleChange, currentValue}) {

  const handle = (e) => {
    handleChange(e.target.value)
  }

  return (
    <div className='dropdown-bar'>
      <label>
        <select 
        className='dropdown'
          value={currentValue}
          onChange={handle}
        >
          { options.map((cat, index) => <option
          key={index}
          value={cat.name}>
          {cat.name}
          </option>) }
          
        </select>
      </label>

    </div>
  );
}
