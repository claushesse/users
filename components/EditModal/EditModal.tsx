import React, { useState, useCallback, useEffect } from 'react';
import { CustomFileInput } from './components/CustomFileInput';
import { ConfirmationModal } from './components/ConfirmationModal/ConfirmationModal'; 
import './EditModal.css';

export const EditModal = ({user, setOpenModal, users, setUsers, filteredUsers, setFilteredUsers, setEditingUser}) => {
  const [confirmationData, setConfirmationData] = useState<any>({state: false, type: undefined, res: undefined, rej: undefined});
  const [values, setValues] = useState<any>(
    {
      name: user.name.first,
      lastname: user.name.last,
      phone: user.phone,
      city: user.location.city,
      state: user.location.state,
      email: user.email,
      picture: user.picture.large
    }
  );

  const handleFormChange = useCallback((e) => {
    const { value, name } = e.target;
    if(name === 'phone' && value.match(/^[^a-zA-Z]*$/)){
      setValues({...values, [name]: value});
    } else if(name !== 'phone'){
      setValues({...values, [name]: value});
    }
  }, [values])

  const handleCancel = useCallback(() => {
    new Promise((res, rej) => {
      setConfirmationData({state: true, type: 'cancel', res, rej});
    }).then(() => {
      document.body.style.overflow = 'auto';
      setConfirmationData({state: false, type:undefined, res: undefined, rej: undefined});
      setOpenModal(false)
    }).catch((e) => {
      setConfirmationData({state: false, type:undefined, res: undefined, rej: undefined});      
    })
  }, [setOpenModal])

  const handleSave = useCallback(() => {
    new Promise((res, rej) => {
      setConfirmationData({state: true, type: 'save', res, rej})
    }).then(() => {
      const usersCopy = [...users];
      const filteredUsersCopy = [...filteredUsers];
      const userChanged = usersCopy.find(u => u.email === user.email);
      const filteredUserChanged = filteredUsersCopy.find(u => u.email === user.email);
      const userWithNewValues = {
        ...userChanged,
        email: values.email.trim(),
        name:{
          ...userChanged.name,
          first: values.name.trim(),
          last: values.lastname.trim()
        },
        phone: values.phone,
        location: {
          ...userChanged.location,
          city: values.city.trim(),
          state: values.state.trim()
        },
        picture: {
          ...userChanged.picture,
          large: values.picture
        }
      };
      usersCopy.splice(usersCopy.indexOf(userChanged), 1, userWithNewValues);
      filteredUsersCopy.splice(filteredUsersCopy.indexOf(filteredUserChanged), 1, userWithNewValues);
      setUsers(usersCopy)
      setFilteredUsers(filteredUsersCopy)
      setConfirmationData({state: false, type: undefined, res: undefined, rej: undefined});
      setOpenModal(false)
      setEditingUser(undefined)
      document.body.style.overflow = 'auto';
    }).catch((e) => {
      setConfirmationData({state: false, type: undefined, res: undefined, rej: undefined});
    })
  }, [values, user, setOpenModal, users, setUsers, filteredUsers, setFilteredUsers])

  const handlePictureChange = useCallback((picture) => {
    if(picture){
      setValues({...values, picture: URL.createObjectURL(picture)})
    }
  }, [values])

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <div className="edit-modal-close-top" onClick={handleCancel}>X</div>
        <h1>User Edit</h1>
        <div className="edit-modal-picture"> 
          <div className="edit-modal-picture-img" style={{ 
            backgroundImage: `url(${values.picture})`,
            backgroundSize: 'cover',
          }} />
          <CustomFileInput handlePictureChange={handlePictureChange} />
        </div>
        <div className="edit-modal-form">
          <div className="edit-modal-input-container">
            <label>Name: </label>
            <input type="text" name='name' value={values.name} onChange={handleFormChange} maxLength="14"/>
          </div>
          <div className="edit-modal-input-container"> 
            <label>Lastname: </label>
            <input type="text" name='lastname' value={values.lastname} onChange={handleFormChange} maxLength="14"/>
          </div>
          <div className="edit-modal-input-container"> 
            <label>Email: </label>
            <input type="text" name='email' value={values.email} onChange={handleFormChange} maxLength="30"/>
          </div>
          <div className="edit-modal-input-container">
            <label>Phone: </label>
            <input type="text" name='phone' value={values.phone} onChange={handleFormChange} maxLength="19"/>
          </div>
          <div className="edit-modal-input-container">          
            <label>State: </label>
            <input type="text" name='state' value={values.state} onChange={handleFormChange} maxLength="28"/>
          </div>
          <div className="edit-modal-input-container">
            <label>City: </label>
            <input type="text" name='city' value={values.city} onChange={handleFormChange} maxLength="28"/>
          </div>          
        </div>
        <div className="edit-modal-footer">
          <div className="edit-modal-button-container">
            <button className="edit-modal-cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
          <div className="edit-modal-button-container">
            <button className="edit-modal-save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
      {confirmationData.state && 
        <ConfirmationModal confirmationData={confirmationData}/>
      }
    </div>
  )
}