import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { infoHolder: [] };
  }
  fetcher = async (userName) => {
    const resp = await fetch(`https://api.github.com/users/${userName}`);
    try {
      const data = await resp.json();
      return data;
    } catch (error) {
      return "error";
    }
  };
  show = (inputValue) => {
    this.fetcher(inputValue).then((data) => {
      if (data.message === "Not Found") {
        alert("User name was not found, check again");
      } else {
        let indicator = 0;
        this.state.infoHolder.forEach((card) => {
          if (card.id === data.id) {
            indicator++;
          }
        });
        if (indicator > 0)
          alert(`User name already exists under the name of ${data.name}`);
        else this.setState({ infoHolder: [...this.state.infoHolder, data] });
      }
    });
  };
  render() {
    return (
      <>
        <h1>Welcome to GitHub profile fetcher</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.show(document.getElementById("UIForProfile").value);
          }}
        >
          <label>
            Please enter the name of the profile you would like to show
            information for :
          </label>
          <br></br>
          <input type="text" id="UIForProfile" required></input>
          <br></br>
          <button>Fetch</button>
        </form>
        <CardList profiles={this.state.infoHolder} />
      </>
    );
  }
}
class CardList extends React.Component {
  render() {
    return (
      <div className="github-profiles">
        {this.props.profiles.map((profile) => (
          <Card key={profile.id} {...profile} />
        ))}
      </div>
    );
  }
}
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img
          alt="Not found"
          className="profile-photo"
          src={profile.avatar_url}
        />
        <div className="info">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="name"
          >
            {profile.name}
          </a>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}
export default App;
