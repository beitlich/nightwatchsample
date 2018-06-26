exports.command = function(callback) {
    var SauceLabs = require("saucelabs");
    
    var saucelabs = new SauceLabs({
        username: process.env.SAUCE_USERNAME,
        password: process.env.SAUCE_ACCESS_KEY
    });

    console.log(this.currentTest)
    console.log('build number: ' + this.globals.circlebuildnumber)
    var sessionid = this.capabilities['webdriver.remote.sessionid'],
        status = this.currentTest.results.failed === 0 && this.currentTest.results.errors === 0;

    if(!this.globals.circlebuildnumber) {
        var self = this
        saucelabs.updateJob(sessionid, {
        passed: status
        }, function () {
            self.end(callback)
        });
    }else{
        var self = this
        saucelabs.updateJob(sessionid, {
        passed: status,
        build: this.globals.circlebuildnumber
        }, function () {
            self.end(callback)
        });
    }
};