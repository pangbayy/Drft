import React from "react";
import "./styles.css";
import Card from "../Card/Card";
import JournalService from "../Services/JournalService";

class Waterfall extends React.Component {
  state = {
    journals: [],
  };
  constructor() {
    super();
    JournalService.getAllJournals()
      .then((res) => {
        this.setState({ journals: res.data.journals });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="waterfall-header">Stories from people</div>
        <div className="row" data-masonry='{"percentPosition": true}'>
          {this.state.journals.map((journal) => (
            <Card
              key={journal._id}
              layout="journal-col col col-lg-4 col-md-6 col-sm-12"
              title={journal.title}
              content={journal.content}
              to={{
                pathname: "./editor",
                state: {
                  title: journal.title,
                  content: journal.content,
                  editable: false,
                },
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Waterfall;
