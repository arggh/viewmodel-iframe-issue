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
    console.log(`Let's try the same inside IFRAME`);
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
    console.log(`Let's open a modal with plain hard coded values...`);
    const modal1 = new Modal();
    modal1.open('person', TEST_DATA_CONTEXT);
  
    console.log(`Let's open a modal with values from calling VM Methods...`);
    const modal2 = new Modal();
    modal2.open('person', {
      person: this.person(),
      persons: this.persons().array()
    });
  }
});

Template.person.viewmodel({
  onCreated() {
    const data = Template.currentData();
    console.log(`The type of person property is ${typeof data.person}`);
    console.log(`Is person instance of Object? ${data.person instanceof Object}`);
    console.log(`Let's see what SimpleSchema thinks...`);
    new SimpleSchema({
      person: { type: Object },
      'person.name': { type: String },
      'person.skills': { type: [String] },
      persons: { type: [Object] },
      'persons.$.name': { type: String },
      'persons.$.skills': { type: [String] }
    }).validate(data);
    console.log('Succesfully determined person prop is actually an object!');
  }
});