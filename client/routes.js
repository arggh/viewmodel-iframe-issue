FlowRouter.route('/frame', {
  name: 'frame',
  action: (params, queryParams) => {
    BlazeLayout.render('proxy');
  }
});

FlowRouter.route('/', {
  name: 'main',
  action: (params, queryParams) => {
    BlazeLayout.render('main');
  }
});