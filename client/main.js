import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import Modal from './modal'

const TEST_DATA_CONTEXT = {
  person: { name: 'John', skills: ['gardening', 'bbq'] },
  persons: [
    { name: 'John', skills: ['gardening', 'bbq'] },
    { name: 'Mary', skills: ['gardening', 'bbq'] },
    { name: 'Rupert', skills: ['gardening', 'bbq'] },
    { name: 'Jack', skills: ['gardening', 'bbq'] }
  ]
};

Template.main.viewmodel({
  props() {
    return {
      template: 'introduction',
      dataContext: TEST_DATA_CONTEXT
    };
  }
});

Template.manualRender.viewmodel({
  render() {
    const iframe = document.getElementById('iframe');
    const innerWindow = iframe.contentWindow;
    innerWindow.renderTemplate({
      template: 'introduction',
      dataContext: TEST_DATA_CONTEXT
    });
  }
});

Template.proxy.viewmodel({
  template: null,
  dataContext: null,

  onCreated() {
    window.renderTemplate = ({ template, dataContext }) => {
      this.template(template);
      this.dataContext(dataContext);
    }
  }
});

Template.introduction.viewmodel({
  openModal() {
    const modal = new Modal();
    modal.open('person', {
      person: this.person(),
      persons: this.persons().array()
    })
  }
});

Template.person.viewmodel({
  onCreated() {
    new SimpleSchema({
      person: { type: Object },
      'person.name': { type: String },
      'person.skills': { type: [String] },
      persons: { type: [Object] },
      'persons.$.name': { type: String },
      'persons.$.skills': { type: [String] }
    }).validate(Template.currentData());
  }
});