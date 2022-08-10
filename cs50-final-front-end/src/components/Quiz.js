// Import react and the necessary component "Question"
import React, { Component } from 'react';
import Question from './Question';



class Quiz extends Component{
  // Defines intial state and binds functions
  constructor() {
    super();
    this.state = {
      questions: {},
      responses: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Fetches question data on component mounting
  componentDidMount(){
    fetch(`${this.props.server}/questions/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          questions: data
        })
      });
  } 

  // Posts question responses to the server for grading
  // Reroutes to rank component on submit
  onSubmit(event){
    event.preventDefault();
    fetch(`${this.props.server}/quiz`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.user.id,
        responses: this.state.responses
        })
    })
      .then(response => response.json())
      .then(user => {
        this.props.onRouteChange('rank');
      })
  }

  // Stores the responses for each question in state
  // Whenever there is a change in response
  handleChange(event){
    this.setState(prevState => {
      let responses = Object.assign({}, prevState.responses);
      responses[event.target.name] = event.target.value;
      return {responses};
    })
  }

  render(){
    // dereferences the questions data from state
    const {questions} = this.state;

    // Displays the questions by mapping them from the object
    // Based on the outlined template
    return (
    <div>
      { Object.keys(questions).length === 0
          ? <p> Loading Quiz Questions </p> //Placeholder for when loading
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