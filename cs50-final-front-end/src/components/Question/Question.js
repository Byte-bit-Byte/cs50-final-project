import React, { Component } from 'react';

class Question extends Component{
  render(){
    const {id, prompt, options, handleChange} = this.props
    return (
    <div>
      <fieldset id={id} className="ma2 mb4 bn center flex flex-column bg-lightest-blue br2 pa2 w-75">
        <legend className="fw7 mb2 pb3">Question {id}</legend>
        <p> {prompt} </p>
        {
        Object.keys(options).map((key) => {
        return (
             <div key={key} className="flex items-center ma2">
               <input  
                type="radio"
                className="radio"  
                id={key} 
                name={id} 
                value={key}
                onChange={handleChange} />
               <label 
                htmlFor={key} 
                className="lh-copy">
                  {options[key]}
                </label>
             </div>
            )
          })
        }
      </fieldset>
    </div>
  );
  }  
}

export default Question;