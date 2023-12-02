import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUser.css';
import baseUrl from '../../config';
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [newPoliceStation, setNewPoliceStation] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);



  
  useEffect(() => {
    fetchUsers();
  }, []);


  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}user/userDetails`); // Replace with your API endpoint to fetch users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedUser(null); // Reset selectedUser when the search term changes
  };
  
  
  const handleRemoveEmployee = async (employeeId) => {
    const confirmed = window.confirm('Are you sure you want to remove this employee?');
    if (confirmed) {
      try {
        await axios.delete(`${baseUrl}user/deleteuser/${employeeId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error removing employee:', error);
      }
    }
  };

  const handleToggleAccountStatus = async (userId, newStatus) => {
    try {
      await axios.put(`${baseUrl}user/updateuser/${userId}`, { account_status: newStatus });

      fetchUsers();
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  };



  const handleUpdatePoliceStation = async (userId) => {
    try {
      await axios.put(`${baseUrl}user/updatePoliceStation/${userId}`, { police_station: newPoliceStation });
      fetchUsers();
      setSelectedUser(null); // Reset selected user after updating police station
    } catch (error) {
      console.error('Error updating police station:', error);
    }
  };

  const filteredUsers = users.filter((user) =>

  user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.police_station.toLowerCase().includes(searchTerm.toLowerCase())
  || user.id.toString().includes(searchTerm)

 
);


const renderUserRow = (user) => {
  if (showAdvancedOptions) {
    return (
      <tr key={user._id} className={selectedUser === user ? 'selected-user' : ''}>
        <td className='tablerow'>{user.id}</td>
        <td className='tablerow'>{user.username}</td>
        <td className='tablerow'>{user.email}</td>
        <td className='tablerow'>{user.is_admin}</td>
        <td className='tablerow'>{user.is_verified}</td>
        <td className='tablerow'>{user.created_at}</td>
        <td className='tablerow'>{user.last_login}</td>
        <td className='tablerow'>{user.account_status}</td>
     
        <td className='tablerow'>
          {selectedUser === user ? (
            <input
              type="text"
              placeholder="Enter new police station"
              value={newPoliceStation}
              onChange={(e) => setNewPoliceStation(e.target.value)}
            />
          ) : (
            user.police_station || 'Not specified'
          )}
        </td>
        <td className='tablerow'>
          <button className='btn' onClick={() => handleRemoveEmployee(user._id)}>Remove</button>
        </td>
        <td className='tablerow'>
          {user.account_status === 'active' ? (
            <button className='btn' onClick={() => handleToggleAccountStatus(user._id, 'inactive')}>Set as Inactive</button>
          ) : (
            <button className='btn' onClick={() => handleToggleAccountStatus(user._id, 'active')}>Set as Active</button>
          )}
        </td>
        <td className='tablerow'>
          {selectedUser === user ? (
            <button className='btn' onClick={() => handleUpdatePoliceStation(user._id)}>
              Save
            </button>
          ) : (
            <button
              className='btn'
              onClick={() => setSelectedUser(selectedUser === user ? null : user)}
            >
              {selectedUser === user ? 'Cancel' : 'Update Station'}
            </button>
          )}
        </td>
      </tr>
    );
  } else {
    return (
      <tr key={user._id} className={selectedUser === user ? 'selected-user' : ''}>
        {/* Render only basic columns here */}
        <td className='tablerow'>{user.id}</td>
        <td className='tablerow'>{user.username}</td>
        <td className='tablerow'>{user.email}</td>
        <td className='tablerow'>{user.is_admin}</td>
        <td className='tablerow'>{user.is_verified}</td>

        <td className='tablerow'>{user.account_status}</td>
        <td className='tablerow'>
          {selectedUser === user ? (
            <input
              type="text"
              placeholder="Enter new police station"
              value={newPoliceStation}
              onChange={(e) => setNewPoliceStation(e.target.value)}
            />
          ) : (
            user.police_station || 'Not specified'
          )}
        </td>
      </tr>
    );
  }
};













  return (
    <div className="manage-users-container">
    <div className="emplist">
      <br />
      <br />
      <h2>"Empower and Secure"</h2>
      <p>Managing Officers Access - Directory and Permissions Control</p> <button onClick={toggleAdvancedOptions} className="btn">
      {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
    </button>

      <h2>Police Officers List</h2>

      
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by username ,policeid or location"
        value={searchTerm}
        onChange={handleSearch}
      />

      

      <table>
      <thead>
        <tr>
          <th>Police ID</th>
          <th>UserName</th>
          <th>Email</th>
          <th>is_admin</th>
          <th>is_verified</th>
     
          {showAdvancedOptions && (
            <>
           
              <th>created_at</th>
              <th>last_login</th>
            </>
          )}
          <th>account status</th>
               <th>Station</th>
       
          {showAdvancedOptions && <th>Delete</th>}
          {showAdvancedOptions && <th>Account Status</th>}
          {showAdvancedOptions && <th>update station</th>}
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => renderUserRow(user))}
      </tbody>
    </table>

                  </div>
</div>

                  );
                  };
                  
                  export default ManageUsers;
