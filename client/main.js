import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.manualRender.viewmodel({
  renderList() {
    const iframe = document.getElementById('iframe');
    const innerWindow = iframe.contentWindow;
    innerWindow.renderTemplate({
      template: 'list',
      dataContext: {
        alphabets: ['a', 'b', 'c']
      }
    });
  }
});

Template.main.viewmodel({
  listProps() {
    return {
      template: 'list',
      dataContext: {
        alphabets: ['a', 'b', 'c']
      }
    };
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

Template.list.viewmodel({
  arrayType: null,

  onCreated() {
    const type = this.alphabets().constructor.name;
    this.arrayType(type);
  }
});