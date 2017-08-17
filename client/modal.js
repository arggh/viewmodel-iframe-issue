export default class Modal {
  open(templateName, data) {
    const modalTemplate = Template.modal;
    const modalData = {
      template: templateName,
      context: data
    };

    const view = Blaze.renderWithData(modalTemplate, modalData, document.body);
    this.view = view;
  }

  close() {
    Blaze.remove(this.view);
  }
}

Template.modal.viewmodel({

});