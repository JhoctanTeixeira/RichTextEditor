import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';

import InitialValue from '../utils/InitialValue';

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { link2 } from 'react-icons-kit/feather/link2';

import { ic_title } from 'react-icons-kit/md/ic_title';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { BoldMark, ItalicMark, FormatToolbar } from './index';

export default class TextEditor extends Component {
	state = {
		value: InitialValue,
	};

	onChange = ({ value }) => {
		this.setState({ value });
	};

	onKeyDown = (e, change) => {

		if (!e.ctrlKey) {
			return;
		}

		e.preventDefault();

		switch (e.key) {

			case 'b': {
				change.toggleMark('bold');
				return true;
			}
			case 'i': {
				change.toggleMark('italic');
				return true;
			}

			case 'c': {
				change.toggleMark('code');
				return true;
			}

			case 'l': {
				change.toggleMark('list');
				return true;
			}

			case 'u': {
				change.toggleMark('underline');
				return true;
			}

			case 'q': {
				change.toggleMark('quote');
				return true;
			}

			case 'h': {
				change.toggleMark('title');
				return true;
			}

			default: {
				return;
			}
		}
	};

	renderNode = (props) => {
		console.log(props.node);
		switch (props.node.type) {
			case 'link': {
				console.log(props.node.data.get('href'));
				return (
					<a href={props.node.data.get('href')} {...props.attributes}>
						{props.children}
					</a>
				);
			}

			default: {
				return;
			}
		}
	};

	renderMark = (props) => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;

			case 'italic':
				return <ItalicMark {...props} />;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

			case 'quote':
				return <blockquote {...props.attributes}>{props.children}</blockquote>;

			case 'title':
				return <h1 {...props.attributes}>{props.children}</h1>;

			default: {
				return;
			}
		}
	};

	hasLinks = () => {
		const { value } = this.state;
		return value.inlines.some((inline) => inline.type === 'link');
	};

	wrapLink = (change, href) => {
		change.wrapInline({
			type: 'link',
			data: { href },
		});

		change.collapseToEnd();
	};

	unwrapLink = (change) => change.unwrapInline('link');

	onLinkClick = (e) => {

		e.preventDefault();

		const { value } = this.state;
		const hasLinks = this.hasLinks();
		const change = value.change();

		if (hasLinks) {
			change.call(this.unwrapLink);
		} else if (value.isExpanded) {
			const href = window.prompt('Digite a URL do link:');
			return href.length > 0 ? change.call(this.wrapLink, href) : null;
		} else {
			const href = window.prompt('Digite a URL do Link:');
			const text = window.prompt('Digite o texto para o link:');

			return href.length > 0
				? change
						.insertText(text)
						.extend(0 - text.length)
						.call(this.wrapLink, href)
				: null;
		}

		this.onChange(change);
	};

	renderLinkIcon = (type, icon) => (
		<button
			onPointerDown={(e) => this.onLinkClick(e, type)}
			className="tooltip-icon-button"
		>
			<Icon icon={icon} />
		</button>
	);

	onMarkClick = (e, type) => {

		e.preventDefault();

		const { value } = this.state;

		const change = value.change().toggleMark(type);

		this.onChange(change);
	};

	renderMarkIcon = (type, icon) => (
		<button
			onPointerDown={(e) => this.onMarkClick(e, type)}
			className="tooltip-icon-button"
		>
			<Icon icon={icon} />
		</button>
	);

	render() {
		return (
			<Fragment>
				<FormatToolbar>
					{this.renderMarkIcon('title', ic_title)}
					{this.renderMarkIcon('bold', bold)}
					{this.renderMarkIcon('italic', italic)}
					{this.renderMarkIcon('code', code)}
					{this.renderMarkIcon('list', list)}
					{this.renderMarkIcon('underline', underline)}
					{this.renderMarkIcon('quote', ic_format_quote)}
					{this.renderLinkIcon('link', link2)}
				</FormatToolbar>
				<Editor
					value={this.state.value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
					renderNode={this.renderNode}
				/>
			</Fragment>
		);
	}
}
