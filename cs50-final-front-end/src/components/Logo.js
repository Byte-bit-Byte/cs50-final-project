import React from 'react';
import lights from './lights.png';

// Generates the Logo image and message for App
const Logo = () => {
  return (
    <div className="fl w-100 w-25-ns mr2 mt2" >
      {/*Logo Image*/}
      <div className="br2 shadow-2 pa2 grow"  style={{ height: 145, width: 145 }} >
          <img style={{paddingTop: '5px'}} alt='CS50 lights logo' src={lights} />
      </div>
    {/*Hidden Message for Logo*/}
      <div style={{width: 150 }} >
          <p className='dim underline-hover'>43 53 35 30 20 4C 49 47 48 54 53</p>
      </div>
    </div>
  );
}

export default Logo;