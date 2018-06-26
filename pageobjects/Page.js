module.exports = {
    url: function () {
        return this.api.launchUrl + ''
    },
    elements: {
        page: ''
    },
    commands: [{
        isLoaded() {
            return this
                .waitForElementPresent('@page')
        }
    }],
};

