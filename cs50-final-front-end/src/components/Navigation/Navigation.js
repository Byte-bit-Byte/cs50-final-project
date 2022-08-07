import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className="fl w-100 w-70-ns ml2" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
          <p onClick={() => onRouteChange('quiz')} className='f3 link dim black underline pa3 pointer'>Quiz</p>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav className="fl w-100 w-70-ns ml2" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;