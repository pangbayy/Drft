import React from "react";

import Button from "../Button/Button";
import "./styles.css";

import JournalService from "../Services/JournalService";
import { TextField } from "@material-ui/core";
class Input extends React.Component {
  constructor(props) {
    super(props);

    // check if title are passed by props, if so, set the title as given
    const passedInState = this.props.location.state;
    let title = passedInState.title || "Untitled";
    let content = passedInState.content || "";
    let editable = passedInState.editable && true;

    this.state = {
      user: this.props.user,
      title: title,
      content: content,
      editable: editable,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    if (target.name === "title") {
      if (target.value.length > 100) {
        target.value = target.value.slice(0, 99);
        alert("Title cannot exceed 100 characters");
      }
    }
    this.setState({ [target.name]: target.value });
  };
  render() {
    const { title, content, user, editable } = this.state;
    //InputProps applies to component
    const titleinputProps = {
      style: {
        fontSize: 29,
        fontFamily: "Lato",
        fontWeight: "400",
        color: editable ? "#8e8d8b" : "black",
        lineHeight: "35px",
      },
    };
    const contentinputProps = {
      style: {
        fontSize: 18,
        font: "Lato",
        fontFamily: "Lato",
        padding: "1rem",
        color: "black",
      },
    };

    //inputProps applies to input element
    const InputProps = {
      disableUnderline: true,
      readOnly: editable ? false : true,
    };

    return (
      <div className="container-fluid">
        <div className="title-wrapper">
          <TextField
            className="title"
            name="title"
            fullWidth
            multiline
            rowsMax={2}
            placeholder="Untitled"
            InputProps={InputProps}
            inputProps={titleinputProps}
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div className="content-wrapper">
          <TextField
            className="content"
            name="content"
            multiline
            rows={15}
            fullWidth
            placeholder="Write here..."
            inputProps={contentinputProps}
            InputProps={InputProps}
            value={content}
            onChange={this.handleChange}
            variant="outlined"
          />
        </div>
        {editable && (
          <div className="button">
            <Button
              text="Save"
              onClick={() => {
                JournalService.postJournal(title, user._id, content);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Input;
