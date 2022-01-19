import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import InitialValue from "../utils/InitialValue";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { list } from "react-icons-kit/feather/list";
import { underline } from "react-icons-kit/feather/underline";

import { BoldMark, ItalicMark, FormatToolbar } from "./index";

export default class TextEditor extends Component {
  state = {
    value: InitialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  oneKeyDown = (e, change) => {
    if (!e.ctrlKey) { return }
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
      case "c": {
        change.toogleMark("code");
        return true;
      }
      case "l": {
        change.toogleMark("list");
        return true;
      }
      case "u": {
        change.toogleMark("underline");
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

      case "code":
        return <code {...props.attributes}>{props.children}</code>;

      case "list":
        return (
          <ul {...props.attributes}>
            <li>props.children</li>
          </ul>
        );

      case "underline":
        return <u {...props.attributes}>{props.children}</u>;
      default: {
        return;
      }
    }
  };

  onMarkClick = (e, type) => {
    e.preventDefault();

    const { value } = this.state;

    const change = value.change().toogleMark(type);

    this.onChange(change);
  };

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            onPointerDown={(e) => this.onMarkClick(e, "bold")}
            className="tooltip-icon-button"
          >
            <Icon icon={bold} />
          </button>

          <button
            onPointerDown={(e) => this.onMarkClick(e, "italic")}
            className="tooltip-icon-button"
          >
            <Icon icon={italic} />
          </button>

          <button
            onPointerDown={(e) => this.onMarkClick(e, "code")}
            className="tooltip-icon-button"
          >
            <Icon icon={code} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, "list")}
            className="tooltip-icon-button"
          >
            <Icon icon={list} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, "underline")}
            className="tooltip-icon-button"
          >
            <Icon icon={underline} />
          </button>
        </FormatToolbar>

        <Editor
          value={this.state.value}
          onChange={this.onChange}
          oneKeyDown={this.oneKeyDown}
          renderMark={this.renderMark}
        />
      </Fragment>
    );
  }
}
