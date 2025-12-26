/// <reference path="./types.d.ts" />

import { html, LitElement } from 'lit';
import markdown from './markdown.md';

export class MyElement extends LitElement {
  public override render() {
    return html`
      <div class="markdown">${markdown}</div>
    `;
  }
}

customElements.define('my-element', MyElement);

console.log('hello world');

document.body.innerHTML = '<my-element></my-element>';
