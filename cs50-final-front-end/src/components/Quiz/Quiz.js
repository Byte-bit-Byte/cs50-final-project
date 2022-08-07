import React, { Component } from 'react';
import Question from '../Question/Question';



class Quiz extends Component{
  constructor() {
    super();
    this.state = {
      questions: {},
      responses: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    fetch(`http://localhost:3001/questions/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          questions: data
        })
      });
  } 

  onSubmit(event){
    event.preventDefault();
    console.log(this.state.responses);
    fetch('http://localhost:3001/quiz', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.user.id,
        responses: this.state.responses
        })
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        this.props.onRouteChange('rank');
      })
  }

  handleChange(event){
    // console.log("value is", event.target.value);
    // console.log("name is", event.target.name);
    this.setState(prevState => {
      let responses = Object.assign({}, prevState.responses);
      responses[event.target.name] = event.target.value;
      return {responses};
    })
  }

  render(){
    const {questions} = this.state;
    return (
    <div>
      { Object.keys(questions).length === 0
          ? <p> Loading Quiz Questions </p>
          : (
              <form onSubmit={this.onSubmit}>
                <h2> CS50 LIGHTS QUIZ </h2>
                <p> No Answers, No Feedback, just pure quiz action to climb the rank </p>
                  {
                    Object.keys(questions).map((key) => {
                    return (<Question
                      key={questions[key].id} 
                      id={questions[key].id} 
                      prompt={questions[key].prompt} 
                      options={questions[key].options}
                      handleChange={this.handleChange} />
                      )
                    })
                  }
                  <input className="f5 pv2 ph3 m2 grow br-pill bg-light-blue" type="submit" value="Submit" />
              </form>
            )
      }
    </div>
  );
  }  
}

export default Quiz;