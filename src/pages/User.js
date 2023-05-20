import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${username}`);
        setUser({
          img: data.avatar_url,
          id: data.login,
          repositories: data.public_repos,
          followers: data.followers,
          following: data.following,
          github: data.html_url
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getRepo = async () => {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repositories = data.map(repo => ({
          name: repo.name,
          description: repo.description,
          update: new Date(repo.updated_at).toLocaleDateString()
        }));
        setRepo(repositories);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getRepo();
  }, [username]);

  return (
    <div className='user-container'>
      <section>
        <div className='user'>
          <div className='img'>
            <img src={user.img} alt='Avatar' />
          </div>
          <div className='user-name'>
            <p>{user.id}</p>
          </div>
          <div className='flex1'>
            <div className='repositories'>
                <p>{user.repositories}</p>
                <h3>Repositories</h3>
            </div>
            <div className='followers'>
                <p>{user.followers}</p>
                <h3>Followers</h3>
            </div>
            <div className='following'>
                <p>{user.following}</p>
                <h3>Following</h3>
            </div>
          </div>
          <div className='button'>
            <button type='button' onClick={() => (window.location.href = user.github)}>
              Go to GitHub
            </button>
          </div>
        </div>

        <div className='my-repos'>
          <h2>My Repositories</h2>
          {repo.map((repository, i) => (
            <div key={i} className='repository'>
              <p>
                <div className='flex2'>
                  <div className='flex3'>
                    <div className='repo-name'>{repository.name}</div>
                    <div className='repo-update'>Updated at {repository.update}</div>
                  </div>
                  <div className='repo-description'>{repository.description}</div>
                </div>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default User;
