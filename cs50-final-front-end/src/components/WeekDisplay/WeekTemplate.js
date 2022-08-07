import React, { Component } from 'react';

class WeekTemplate extends Component{
  render(){
    return (
    <div>
      { this.props.src && <img className="cover bg-center" src={ this.props.src } alt={`CS50 stage week ${this.props.name}`} /> }

      { this.props.name === '' 
        ? <div />
        :
          <div className="pv5 f4 f2-ns shadow-2 ma4 mt0 br2 flex flex-column pa2">
            <h1 className="fw6 f1 fl w-100 black-70 mt0 mb3 avenir">{this.props.name}</h1>
            <strong className='f3'>Binary</strong>
            <p className="db lh-copy black-70 serif fw1 mv0 f4 f3-m f2-l baskerville">
              {this.props.binary}
            </p>
            <strong className='f3'>English</strong> 
            <p className="db lh-copy black-70 serif fw1 mv0 f4 f3-m f2-l baskerville">
              {this.props.english}
            </p>
            <strong className='f3'>Possible Reference</strong> 
            <p className="db lh-copy black-70 serif fw1 mv0 f4 f3-m f2-l baskerville">
              {this.props.comment}
            </p>
          </div>
      }
    </div>
  );
  }  
}

export default WeekTemplate;


