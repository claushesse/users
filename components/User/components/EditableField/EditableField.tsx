import React, { useState, useMemo } from 'react';

interface EditableFieldProps {
  name: string;
  className?: string;
  initialValue: string;
}

// this is a generic editable field used for all the editable text inside the cards
export const EditableField = ({className, initialValue, name}: EditableFieldProps) => {
  const [value, setValue] = useState(initialValue);
  const [editable, setEditable] = useState<boolean>(false);

  const inputSize = useMemo(() => { 
    if(name === 'firstName' || name === 'lastName' || name === 'city' || name === 'state'){
      return {
        width: '80px'
      }
    } else if (name === 'email'){
      return {
        width: '80%'
      }
    }
    return {}
  } , [name])

  return (
    editable ? 
    <input
      style={ inputSize }
      value={value} 
      onChange={(e) => setValue(e.target.value.trim())} 
      onBlur={() => setEditable(false)}
      type="text"
      maxLength="40"
      autoFocus
    />
    :
    <div onClick={() => setEditable(true)} className={className}>{value || `-`}</div>
  )
}