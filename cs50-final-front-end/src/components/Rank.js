import React, {Component} from 'react';

class Rank extends Component{
  // Defines initial state for the component
  constructor() {
    super();
    this.state = {
      leaderboard: [],
      scores: [],
      attempts: 0,
      max_score: 0
    };
  }

  // Fetches leaderboard and score data for the user
  // Once the component is loaded
  // Stores them in state for use later
  componentDidMount(){
      fetch(`${this.props.server}/rank`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.props.user.id
        })
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          leaderboard: response[0],
          scores: response[1],
          attempts: response[2][0].attempts,
          max_score: response[2][0].max_score
        })
      });
  }

  render() {
    // dereferences prop and state variables
    const {user} = this.props;
    const {leaderboard, scores, attempts, max_score} = this.state;

    return (
      <div className="pa4">
        {
          this.state.leaderboard.length === 0
          ? <h3 className='mt4 mb4'> Loading Leaderboard ... </h3> // Loading message
          : (        // Displays table based on leaderboard data from database
            <div className="overflow-auto mb4">
              <h3> Top 10 Leaderboard </h3>
              <table className="f6 w-100 mw8" cellSpacing="0">
               <thead>
                  <tr className="stripe-dark">
                    <th className="fw6 pa3 bg-red">Rank</th>
                    <th className="fw6 pa3 bg-red">Username</th>
                    <th className="fw6 pa3 bg-red">Attempts</th>
                    <th className="fw6 pa3 bg-red">Max Score</th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {
                    leaderboard.map((leader, index) => {
                      return (   
                        <tr className="stripe-dark">
                          <td className="pa3"> {index + 1} </td>
                          <td className="pa3">{leader.name}</td>
                          <td className="pa3">{leader.attempts}</td>
                          <td className="pa3">{leader.max_score}</td>
                        </tr>
                        )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        }

        {
          this.state.scores.length === 0
          ? <h3 className='mt4 mb4'> Loading Previous Scores ... </h3> // Loading message
          : ( //Displays user's last five scores if they exist in database
            <div className="overflow-auto">
              <h3> {`${user.name}'s Last 5 Attempts out of ${attempts} Attempts`} </h3>
              <h4> {`With ${user.name}'s Current Highest Score being ${max_score}`} </h4>
              <table className="f6 w-100 mw8" cellSpacing="0">
               <thead>
                  <tr className="stripe-dark">
                    <th className="fw6 pa3 bg-orange">Score</th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {
                    scores.map((score) => {
                      return (
                        <tr className="stripe-dark">
                          <td className="pa3"> {score.score} </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    );
  }
}

export default Rank;