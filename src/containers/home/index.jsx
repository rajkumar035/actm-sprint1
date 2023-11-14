import React from 'react';
import './index.css';
import instagram from '../../assets/svg/insta.svg';
import linkedIn from '../../assets/svg/linkedin.svg';
import twitter from '../../assets/svg/twitter.svg';
import facebook from '../../assets/svg/facebook.svg';
import { useNavigate } from 'react-router-dom';
import { useGoogleAuth } from './../../contexts/GoogleAuthContext';
const logo = require('../../assets/images/logo.png');

const Header = ({ id }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const text = 'Inspiring Medical Pioneers to Shape the Future of Healthcare';
  const myArray = [...text];
  // CssAnimations.typewritingAnimation('.typeText', myArray);

  return (
    <>
      <nav className='header'>
        <button
          onClick={() => {
            handleNavigation('/webinars');
          }}>
          Webinars
        </button>
        <button
          onClick={() => {
            handleNavigation('/about');
          }}>
          About
        </button>
        <img alt='logo' src={logo} />
        <button
          onClick={() => {
            handleNavigation('/offers');
          }}>
          Offers
        </button>
        <button
          onClick={() => {
            handleNavigation('/events');
          }}>
          Events
        </button>
      </nav>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const { currentUser, googleSignIn, googleSignOut, loading } = useGoogleAuth();
  return (
    <section className='homepage'>
      <Header />
      <div className='homepage__layout'>
        <div className='header__actions'>
          {currentUser ? (
            <button onClick={googleSignOut} className='loginButton'>
              Sign Out
            </button>
          ) : (
            <button
              className='loginButton'
              onClick={googleSignIn}
              disabled={loading && !currentUser ? true : false}>
              Login with Google
            </button>
          )}
        </div>
        <div className='moraltext'>
          <h1>Inspiring Medical Pioneers to Shape the Future of Healthcare </h1>
          <button
            className='btn--outlined'
            onClick={() => {
              handleNavigation('/missions');
            }}>
            Join Now
          </button>
        </div>
        <div className='contact__list'>
          <button className='btn--text'>
            <img src={twitter} alt='twitter' />
          </button>
          <button className='btn--text'>
            <img src={facebook} alt='facebook' />
          </button>
          <button className='btn--text'>
            <img src={instagram} alt='instagram' />
          </button>
          <button className='btn--text'>
            <img src={linkedIn} alt='linkedIn' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
