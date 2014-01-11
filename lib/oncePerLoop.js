module.exports = function (fn) {
    var queued = false;

    var newFn = function () {
        if (!queued) {
            queued = true;
            process.nextTick(function () {
                fn.apply(this, arguments);
                queued = false;
            });
        }
    };

    return newFn;
}
