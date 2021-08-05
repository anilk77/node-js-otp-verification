var cron = require('node-cron');
var ProfileListener = require('./profileListener');
var profileListener = new ProfileListener();
var profile_email_running = true;
console.log('Hey Cron File');
cron.schedule('*/1 * * * *', function () {
    console.log('It comes here inside cron....');
    if (profile_email_running) {
        console.log('It comes here inside cron....123344');
        profile_email_running = false;
        profileListener.runCron(function () {
            profile_email_running = true;
        });
    }
});