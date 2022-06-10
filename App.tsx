import React, { useEffect, useState, useCallback } from 'react';
import { User as UserType } from './User/types';
import { User } from './components/User/User';
import { Filters } from './components/Filters/Filters';
import { filterList, sortList } from './helpers'; // helper functions for filter the users
import { AppContext } from './context/AppContext';
import { EditModal } from './components/EditModal/EditModal';
import './App.css';

export const App = () => {
  const [users, setUsers] = useState<UserType[] | undefined>(); // users is the api response 
  const [filteredUsers, setFilteredUsers] = useState<UserType[] | undefined>(); // filteredUsers is used for filter the api response when sorting or searching 
  const [error, setError] = useState<Error | undefined>(); // if there is a problem when fetching the api the error is setted and an error message is displayed instead of the list of users
  const [searchValue, setSearchValue] = useState<string | undefined>(); // search value
  const [sortValue, setSortValue] = useState<string | undefined>(); // sort value
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  // function used to filter results
  const handleFilterChange = useCallback((search, sort, identifier) => {
    if(search || sort){
      const filteredUsersCopy = [...filteredUsers];
      if(search){
        if(search !== searchValue) setSearchValue(search);
        if(!sortValue){
          setFilteredUsers(filterList(users, search))
        } else {
          const filteredBySort = sortList(users, sortValue);
          setFilteredUsers(filterList(filteredBySort, search));
        }
      }
      if(sort){
        if(sort !== sortValue) setSortValue(sort);
        if(!searchValue){
          setFilteredUsers(sortList(users, sort))
        } else {
          const filteredBySearch = filterList(users, searchValue);
          setFilteredUsers(sortList(filteredBySearch, sort));
        }
      }
    } else {
      if(identifier === 'sort') setSortValue(undefined);
      if(identifier === 'search') setSearchValue(undefined);
    }
  }, [users, setFilteredUsers, filteredUsers, searchValue, sortValue])

  const handleUserEdit = useCallback((user) => {
    const  { body } = document;
    body.style.overflow = 'hidden';
    setEditingUser(user);
    setOpenModal(true);
  }, [setEditingUser, setOpenModal])

  // this useEffect fetch the api at the first load
  useEffect(() => {
    // i limited the number of results and only fetched the fields that i need
    fetch(
      'https://randomuser.me/api/?results=50&inc=name,picture,email,phone,location&noinfo'
    )
      .then(res => res.json())
      .then(data => {
          setUsers(data?.results);
          setFilteredUsers(data?.results);
        }
      )
      .catch(e => setError(e));
  }, []);

  // if there are no search or sort values, set users unfiltered
  useEffect(() => {
    if(!searchValue && !sortValue){
      setFilteredUsers(users);
    }
  }, [searchValue, sortValue, users])

  // i used a context to avoid passing props through components
  return (
    !error ? (
      <AppContext.Provider value={{handleFilterChange, handleUserEdit}}>
        <div className="app-container">
          <Filters />
          {filteredUsers && (
            <div className="users-container">
              {filteredUsers.map(user => (
                <User user={user} key={user.phone}/>
              ))}
            </div>
          )}
        </div>
        {openModal && 
          <EditModal 
            user={editingUser} 
            setOpenModal={setOpenModal} 
            users={users}
            setUsers={setUsers}
            filteredUsers={filteredUsers}
            setFilteredUsers={setFilteredUsers}
            setEditingUser={setEditingUser}
          />}
      </AppContext.Provider>
    ) : (
      <div>Hubo un error al cargar los usuarios</div>
    )
  )
}