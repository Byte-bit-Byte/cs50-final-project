import React, {Component} from 'react';

// Creates footer to reference source of images
// And link to Git Hub Repo and Companion Medium Article
class Footer extends Component {

  render() {
    return (
      <div className='pa4 flex flex-column'>
        <a className='link underline-hover white' target='_blank'  rel="noopener noreferrer" href="https://www.youtube.com/c/cs50/videos" title="CS50 Youtube">CS50 Youtube Channel Source of Images</a>
        <a className='link underline-hover white' target='_blank'  rel="noopener noreferrer" href="https://medium.com/@efeogheneerhie.o/why-i-have-to-watch-every-cs50-2021-video-57cffa012e04" title="Project Medium Article">Related Medium Article for project</a>
        <a className='link underline-hover white' target='_blank'  rel="noopener noreferrer" href="https://github.com/Byte-bit-Byte/cs50-final-project.git" title="Git Hub for project">Git Hub Repo for project</a>
        <a className='link underline-hover white' target='_blank'  rel="noopener noreferrer" href="https://www.flaticon.com/premium-icon/light-bulbs_3172852" title="lamp icons">Logo created by Freepik - Flaticon</a>
      </div>
    );
  }
}

export default Footer;