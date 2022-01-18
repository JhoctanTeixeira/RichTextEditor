import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { BoldMark, ItalicMark } from "./index";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!",
              },
            ],
          },
        ],
      },
    ],
  },
});
export default class TextEditor extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  oneKeyDown = (e, change) => {
    if (!e.ctrlKey) {
      return;
    }
    e.preventDefault();

    switch (e.key) {
      case "b": {
        change.toogleMark("bold");
        return true;
      }
      case "i": {
        change.toogleMark("italic");
        return true;
      }
      default: {
        return;
      }
    }
  };

  renderMark = (props) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;

      case "italic":
        return <ItalicMark {...props} />;

      default: {
        return;
      }
    }
  };

  render() {
    return (
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        oneKeyDown={this.oneKeyDown}
        renderMark={this.renderMark}
      />
    );
  }
}
