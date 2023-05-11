import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  // if user signout and you are trying to go localhost:5000/shipping page you will automaticaly back to signinpage
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [userInfo, navigate]);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();

    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm('You did set location on map.Continue?');
    }

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate('/payment');
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    navigate('/map');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter full name"
            required
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter address"
            required
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Enter city"
            required
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">Postal Code</label>
          <input
            type="number"
            id="postalCode"
            value={postalCode}
            placeholder="Enter Postal Code"
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            placeholder="Enter Country"
            required
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose on Map
          </button>
        </div>
        <div>
          <label></label>
          <button type="submit" className="primary" onClick={submitHandler}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
