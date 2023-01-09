var StopWatch = /** @class */ (function () {
    function StopWatch(wrapper) {
        this.domRef = document.getElementById(wrapper);
        this.duration = 0;
        this.status = 'stopped';
        if (!this.domRef)
            throw new Error('Does not exist');
        this.render();
    }
    StopWatch.prototype.render = function () {
        var _this = this;
        this.domRef.append(createBtn('start', function () { return _this.start(); }), createBtn('stop', function () { return _this.stop(); }), createBtn('reset', function () { return _this.reset(); }));
    };
    StopWatch.prototype.watch = function () {
        var p = document.createElement("p");
        p.id = "p";
        document.body.appendChild(p);
        document.getElementById("p").innerHTML = this.currentWatch();
    };
    StopWatch.prototype.start = function () {
        var _this = this;
        if (this.status === 'started')
            throw new Error('already started');
        this.currentTime = Date.now();
        this.status = 'started';
        this.interval = setInterval(function () { return _this.watch(); }, 100);
    };
    StopWatch.prototype.currentWatch = function () {
        this.duration = Date.now() - this.currentTime + this.duration;
        if (this.status === 'stopped')
            this.stop();
        return this.duration;
    };
    StopWatch.prototype.stop = function () {
        clearInterval(this.interval);
        if (this.status === 'stopped')
            throw new Error('already stopped');
        this.duration = Date.now() - this.currentTime + this.duration;
        this.status = 'stopped';
        return this.duration;
    };
    StopWatch.prototype.reset = function () {
        if (this.status === 'started')
            this.stop();
        this.duration = 0;
        document.getElementById("p").innerHTML = this.duration;
    };
    return StopWatch;
}());
function createBtn(name, listener) {
    var startBtn = document.createElement('button');
    startBtn.innerText = name;
    startBtn.addEventListener('click', listener);
    return startBtn;
}
(function () {
    var btns = document.getElementsByClassName('add-btn');
    btns[0].addEventListener('click', function () {
        new StopWatch(btns[0].getAttribute('data-idw'));
    });
})();
