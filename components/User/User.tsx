import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';
import { User } from './types';
import './User.css';

interface UserProps {
  user: User
}

export const User = ({ user }: UserProps) => {
  const [nameMargin, setNameMargin] = useState({});
  const [locationMargin, setLocationMargin] = useState({marginRight: '5px'});
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const fullNameRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    if(nameRef.current?.offsetWidth + lastNameRef.current?.offsetWidth >= fullNameRef.current?.offsetWidth){
      setNameMargin({marginRight: 0})
    } else {
      setNameMargin({})
    }
    if(stateRef.current?.offsetWidth + cityRef.current?.offsetWidth > locationRef.current?.offsetWidth - 8){
      setLocationMargin({marginRight: 0})
    } else {
      setLocationMargin({marginRight: '5px'})
    }
  }, 
  [
    nameRef.current, 
    lastNameRef.current, 
    fullNameRef.current, 
    stateRef.current,
    cityRef.current,
    locationRef.current,
    user
  ])

  const { handleUserEdit } = useAppContext();
  const {
    name: { first: firstName, last: lastName },
    picture,
    email,
    location: {state, city},
    phone
  } = user;

  return (
  <div className="user">
    <div className="user-header"></div>
    <div className="user-edit-icon" onClick={() => handleUserEdit(user)}>
      <FontAwesomeIcon size="lg" icon={faUserEdit}/>
    </div>
    <div ref={fullNameRef} className="user-fullname">
        <div ref={nameRef} style={nameMargin} className="user-name"> {firstName} </div>
        <div ref={lastNameRef} className="user-lastname"> {lastName} </div>
    </div>
    <div className="user-picture-container">
      <div className="user-picture" style={{ 
        backgroundImage: `url(${picture.large})`,
        backgroundSize: 'cover',
      }} />
    </div>
    <div className="user-email">{email}</div>
    <div className="user-telephone">{phone}</div>
    <div ref={locationRef} className="user-location"> 
      <div ref={stateRef} className="user-state">{state}</div>
      {city && state && <span style={locationMargin}>,</span>}
      <div ref={cityRef} className="user-city">{city}</div>   
    </div>
  </div>);
}
