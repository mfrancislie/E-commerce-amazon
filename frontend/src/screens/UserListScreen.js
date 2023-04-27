import React, { useEffect } from 'react';
import { listUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const UserListScreen = () => {
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>Users List</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SELLER</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : 'NO'}</td>
                <td>{user._isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button type="button" className="small">
                    Edit
                  </button>
                  <button type="button" className="small">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
