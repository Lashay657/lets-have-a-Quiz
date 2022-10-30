class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.props.onChoiceChange(e.target.value);
  }
  render() {
      const question = this.props.question;
      return(
        <div className="well">
          <h3>{question.text}</h3>
          <hr />
          <ul className="list-group">
            {
              question.choices.map(choice => {
                return (
                  <li className="list-group-item" key={choice.id}>
                    {choice.id} <input type="radio" onChange={this.handleChange} name={question.id} value={choice.id} /> {choice.text}
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
  }
}

class Scorebox extends React.Component {
  render(){
    return(
      <div className="well">
        Question {this.props.current} out of {this.props.total} 
        <span className="pull-right"><strong>Score: {this.props.score}</strong></span>
      </div>
    )
  }
}

class Results extends React.Component {
  render(){
    const score = this.props.score;
    const total = this.props.total;
    const percent = score/total*100;
    var message = 'You passed the quiz!';
    var link = <a href="#app">Take Again</a>;
    return(
      <div className="well">
        <h4>You Got {score} out of {total} Correct.</h4>
        <hr />
        <h1>{percent}% - {percent > 60 ? message : link }</h1>
      </div>
    );
    
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      current: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(choice) {
    this.setState((prevState, props) => ({
      current: prevState.current + 1,
      score: choice == props.questions[prevState.current-1].correct ? prevState.score+1 : prevState.score
    }));
  }
  
  render() {
    const questions = this.props.questions;
    return (
      <div>
        {this.state.current > questions.length &&
          <Results total={questions.length} score={this.state.score}/>
        }
        {this.state.current <= questions.length && 
          <Scorebox total={questions.length} current={this.state.current} score={this.state.score} />
        }
        {this.state.current <= questions.length && 
          <Question question={questions[this.state.current-1]} onChoiceChange={this.handleChange} />
        }
      </div>
     )
  }
}

var QUESTIONS = [
        {
          id: 1,
          text: 'What is your name?',
          choices: [
            {
              id: 'a',
              text: 'Michael'
            },
            {
              id: 'b',
              text: 'Ben'
            },
            {
              id: 'c',
              text: 'Yuna'
             }
          ],
          correct: 'b'
        },
        {
          id: 2,
          text: 'What is your best friend\'s name?',
          choices: [
            {
              id: 'a',
              text: 'Luna'
            },
            {
              id: 'b',
              text: 'Juliet'
            },
            {
              id: 'c',
              text: 'Charlie'
             }
          ],
          correct: 'a'
        }
      ];

ReactDOM.render(
  <Quiz questions={QUESTIONS}/>,
  document.getElementById('app')
);
