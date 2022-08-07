import React from 'react';

const Footer = ({ onRouteChange, isSignedIn }) => {
  return (
    <div className='pa4'>
      <a target='_blank'  rel="noopener noreferrer" href="https://www.youtube.com/c/cs50/videos" title="CS50 Youtube">CS50 Youtube Channel Source of Images</a>
      <a target='_blank'  rel="noopener noreferrer" href="https://medium.com/@efeogheneerhie.o/why-i-have-to-watch-every-cs50-2021-video-57cffa012e04" title="Project Medium Article">Related Medium Article for project</a>
      <a target='_blank'  rel="noopener noreferrer" href="#" title="Git Hub for project">Git Hub Repo for project</a>
      <a target='_blank'  rel="noopener noreferrer" href="https://www.flaticon.com/premium-icon/light-bulbs_3172852" title="lamp icons">Logo created by Freepik - Flaticon</a>
    </div>
  );
}

export default Footer;