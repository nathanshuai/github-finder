import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Search() {

  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleUser = async (event) => {
    event.preventDefault();
    
    const input = event.target.user.value.trim();
    
    if (input.length > 0) {
      try {
        const data = await axios.get(`https://api.github.com/users/${input}`);
        if (data) {
          setUser(input);
        }
      } catch (error) {
        setError('User not found');
      };
    } else {
      setError('Please enter a username');
    }
    event.target.user.focus();
  };
  
  useEffect(() => {
    if (user) {
      navigate(`/user/${user}`);
    }
  }, [user]);


  return (
    <div className="container">
      <h1>Github Finder</h1>
      <form onSubmit={handleUser}>
        <input type="text" placeholder='Username' name='user' />
        <button type="submit" className="link">Search</button>
      </form>
      <div className='error'>
        <p>{error}</p>
      </div>
    </div>
  );
}


export default Search;
