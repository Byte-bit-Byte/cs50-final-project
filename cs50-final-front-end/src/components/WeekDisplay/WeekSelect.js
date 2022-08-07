import React, { Component } from 'react';

class WeekSelect extends Component{
  render(){
    return (
    <div className='pa2'>
      <label htmlFor="weeks"  className='pa1 br1 ma2 ba b--green bg-lightest-blue'>Choose a Week: </label>
      <select defaultValue="none" className='pa1 br1 ma2 ba b--green bg-lightest-blue' name="weeks" id="weeks" onChange={this.props.searchChange} >
        <option value="none" hidden >Select an Option</option>
        <option value="0">Week 0</option>
        <option value="1">Week 1</option>
        <option value="2">Week 2</option>
        <option value="3">Week 3</option>
        <option value="4">Week 4</option>
        <option value="5">Week 5</option>
        <option value="6">Week 6</option>
        <option value="7">Week 7</option>
        <option value="7CS">Week 7 CyberSecurity</option>
        <option value="8">Week 8</option>
        <option value="9">Week 9</option>
        <option value="10">Week 10</option>
      </select>
    </div>
  );
  }  
}

export default WeekSelect;