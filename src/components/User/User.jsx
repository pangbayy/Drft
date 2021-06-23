import React from "react";
import "./styles.css";
import Card from "../Card/Card";
import JournalService from "../Services/JournalService";
/* import profilepic from "./nobara.jpg"; */

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      onLogout: this.props.onLogout,
      editModeEnabled: false,
      written: true,
      collected: false,
      writtenJournals: this.props.user.journals,
      collectedJournals: this.props.user.collectedJournals,
    };
  }
  componentDidMount() {
    JournalService.getAllWrittenJournals(this.props.user._id).then((res) => {
      this.setState({ writtenJournals: res.data.journals });
    });
    JournalService.getAllCollectedJournals(this.props.user._id).then((res) => {
      this.setState({ collectedJournals: res.data.journals });
    });
  }

  handleWroteClick() {
    this.setState({ written: true, collected: false });
  }
  handleCollectedClick() {
    this.setState({ written: false, collected: true });
  }

  render() {
    const { written, collected, writtenJournals, collectedJournals } =
      this.state;
    return (
      <div className="container-fluid">
        {/* User Info Section*/}
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="row name">{this.state.user.username}</div>
            <div className="row-col-2">
              <button
                type="button"
                onClick={this.handleWroteClick.bind(this)}
                className="btn btn-link summary-button"
              >
                Wrote {writtenJournals.length}
              </button>
              {/* <button
                type="button"
                onClick={this.handleCollectedClick.bind(this)}
                className="btn btn-link summary-button"
              >
                Collected {collectedJournals.length}
              </button> */}
            </div>
            <div className="row join-date">
              Joined @{this.state.user.joinDate}
            </div>
          </div>
        </div>
        {/* User Journal Section*/}
        <section className="journalBlocks">
          <div className="row user-journal">
            {written &&
              writtenJournals.map((journal) => (
                <Card
                  key={journal._id}
                  layout="journal-col col col-lg-4 col-md-6 col-sm-12"
                  title={journal.title}
                  content={journal.content}
                  to={{
                    pathname: "./editor",
                    state: { title: journal.title, content: journal.content },
                  }}
                />
              ))}
            {collected &&
              collectedJournals.map((journal) => (
                <Card
                  key={journal._id}
                  layout="journal-col col col-lg-4 col-md-6 col-sm-12"
                  title={journal.title}
                  content={journal.content}
                  to={{
                    pathname: "./editor",
                    state: { title: journal.title, content: journal.content },
                  }}
                />
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default User;
