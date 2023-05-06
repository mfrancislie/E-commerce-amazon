import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <div>
      <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            id="q"
            name="q"
            placeholder="Enter Search"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="primary">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
