import React from 'react';
import lights from './lights.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="fl w-100 w-25-ns mr2 mt2" >
      <div className="br2 shadow-2 pa2"  style={{ height: 145, width: 145 }} >
          <img style={{paddingTop: '5px'}} alt='CS50 lights logo' src={lights} />
      </div>
      <div style={{width: 150 }} >
          <p>43 53 35 30 20 4C 49 47 48 54 53</p>
      </div>
    </div>
  );
}

export default Logo;