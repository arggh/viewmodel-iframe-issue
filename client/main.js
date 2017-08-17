import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.checkboxes.viewmodel({
  isChecked() {
    console.log(`Let's see what our __this__ points to...`);
    console.log(this);
    console.log(`Now lets try to reference __this.checkbox2__...`);
    console.log(this.checkbox2);
    console.log(this);
    console.log(`Let's try and see if checkbox is checked (it will throw)`);
    // Next line will throw
    const isChecked = JSON.stringify(this.checkbox2.checked());
    return isChecked;
  }
});