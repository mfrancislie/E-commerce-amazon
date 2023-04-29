import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updatedUser } from '../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const params = useParams();
  const userId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate, navigate]);

  const submitHandler = () => {
    dispatch(updatedUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <div>
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>User Info</h1>
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="isSeller">Seller:</label>
            <input
              type="checkbox"
              id="isSeller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="isAdmin">Admin:</label>
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <div>
            <label></label>
            <button type="submit" className="primary">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
