var Grid = [
    {
        x: 0,
        y: 0,
        active: 1,
        num: 2
    },
    {
        x: 1,
        y: 0,
        active: 1,
        num: 2
    },
    {
        x: 2,
        y: 0,
        active: 1,
        num: 2
    },
    {
        x: 3,
        y: 0,
        active: 1,
        num: 2
    },
    {
        x: 0,
        y: 1,
        active: 1,
        num: 2
    },
    {
        x: 1,
        y: 1,
        active: 1,
        num: 2
    },
    {
        x: 2,
        y: 1,
        active: 1,
        num: 2
    },
    {
        x: 3,
        y: 1,
        active: 1,
        num: 2
    },
    {
        x: 0,
        y: 2,
        active: 1,
        num: 2
    },
    {
        x: 1,
        y: 2,
        active: 1,
        num: 2
    },
    {
        x: 2,
        y: 2,
        active: 1,
        num: 2
    },
    {
        x: 3,
        y: 2,
        active: 1,
        num: 2
    },
    {
        x: 0,
        y: 3,
        active: 0,
        num: 2
    },
    {
        x: 1,
        y: 3,
        active: 0,
        num: 2
    },
    {
        x: 2,
        y: 3,
        active: 0,
        num: 2
    },
    {
        x: 3,
        y: 3,
        active: 0,
        num: 2
    },
];
var GridTamplate = [
    {
        x: 0,
        y: 0,
    },
    {
        x: 1,
        y: 0,
    },
    {
        x: 2,
        y: 0,
    },
    {
        x: 3,
        y: 0,
    },
    {
        x: 0,
        y: 1,
    },
    {
        x: 1,
        y: 1,
    },
    {
        x: 2,
        y: 1,
    },
    {
        x: 3,
        y: 1,
    },
    {
        x: 0,
        y: 2,
    },
    {
        x: 1,
        y: 2,
    },
    {
        x: 2,
        y: 2,
    },
    {
        x: 3,
        y: 2,
    },
    {
        x: 0,
        y: 3,
    },
    {
        x: 1,
        y: 3,
    },
    {
        x: 2,
        y: 3,
    },
    {
        x: 3,
        y: 3,
    },
];

var Box = React.createClass({
    getInitialState: function () {
        return {};
    },
    getStyle: function () {
        var p = this.props.params;
        var style = {
            left: ((p.x * 100)) + "px",
            top: ((p.y * 100)) + "px",
            background: this.getColor(p.num),
            opacity: this.props.params.active
        };
        return style;
    },
    getColor: function (num) {
        switch (num) {
            case 2:
                return "orange";
            case 4:
                return "blue";
            case 8:
                return "green";
        }
        return "#ffffff";
    },
    render: function () {
        return (
            <div style={this.getStyle()} className={this.props.params.active?"game_box":"game_box_disable"}>
                <h1 className="game_box_num">{this.props.params.num}</h1>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        if(localStorage.getItem('score_2048')){
            var score = localStorage.getItem('score_2048');
        }else
            var score = 0;

        return {
            grid: Grid,
            score: 0,
            score_max: score
        };
    },
    toDown: function () {
        var self = this;
        self.process('down');
    },
    toLeft: function () {
        var self = this;
        self.process('left');
    },
    toUp: function () {
        var self = this;
        self.process('up');
    },
    toRight: function () {
        var self = this;
        self.process('right');
    },
    moveHor: function (to) {
        var self = this;
        var f = to == 'left' ? -1 : 1;
        this.state.grid.map(function (el, i) {
            if (f == -1 && el.x > 0 && el.x <= 3 || f == 1 && el.x >= 0 && el.x < 3) {
                var ee = self.isEmpty({x: el.x + f, y: el.y});
                if (!ee) {
                    el.x += f;
                }
            }
        });

    },
    moveVer: function (to) {
        var self = this;
        var f = to == 'up' ? -1 : 1;
        this.state.grid.map(function (el, i) {
            if (f == -1 && el.y > 0 && el.y <= 3 || f == 1 && el.y >= 0 && el.y < 3) {
                var ee = self.isEmpty({x: el.x, y: el.y + f});
                if (!ee) {
                    el.y += f;
                }
            }
        });

    },
    process: function (where){
        var self = this;
        if (where == "down" || where == "up") {
            var move = function () {
                self.moveVer(where);
                self.moveVer(where);
                self.moveVer(where);
                self.moveVer(where);
            };
        } else {
            var move = function () {
                self.moveHor(where);
                self.moveHor(where);
                self.moveHor(where);
                self.moveHor(where);
            };
        }
        move();
        switch (where) {
            case "left":
                var el2 = null;
                var el = null;
                for (var j = 0; j <= 3; j++) {
                    for (var i = 0; i <= 2; i++) {
                        el2 = self.isEmpty({x: i + 1, y: j});
                        el = self.isEmpty({x: i, y: j});
                        if (el2 && el && el2.num == el.num) {
                            el.num *= 2;
                            self.state.score += el.num;
                            el2.active = 0;
                            move();
                        }
                    }
                }
                break;
            case "right":
                var el2 = null;
                var el = null;
                for (var j = 0; j <= 3; j++) {
                    for (var i = 3; i >= 1; i--) {
                        el2 = self.isEmpty({x: i - 1, y: j});
                        el = self.isEmpty({x: i, y: j});
                        if (el2 && el && el2.num == el.num) {
                            el.num *= 2;
                            self.state.score += el.num;
                            el2.active = 0;
                            move();
                        }
                    }
                }
                break;
            case "up":
                var el2 = null;
                var el = null;
                for (var j = 0; j <= 3; j++) {
                    for (var i = 0; i <= 2; i++) {
                        el2 = self.isEmpty({x: j, y: i + 1});
                        el = self.isEmpty({x: j, y: i});
                        if (el2 && el && el2.num == el.num) {
                            el.num *= 2;
                            self.state.score += el.num;
                            el2.active = 0;
                            move();
                        }
                    }
                }
                break;
            case "down":
                var el2 = null;
                var el = null;
                for (var j = 0; j <= 3; j++) {
                    for (var i = 3; i >= 1; i--) {
                        el2 = self.isEmpty({x: j, y: i - 1});
                        el = self.isEmpty({x: j, y: i});
                        if (el2 && el && el2.num == el.num) {
                            el.num *= 2;
                            self.state.score += el.num;
                            el2.active = 0;
                            move();
                        }
                    }
                }
                break;


        }

        var bool = false;
        var tmp = this.state.grid.filter(function (el) {
            return el.active;
        });
        var temp = GridTamplate.filter(function (obj) {
            var t = tmp.filter(function (el) {
                 if(el.x == obj.x && el.y == obj.y) return true;
                 else return false;
            });
            return !t.length;
        });
        var rand_int = self.getRandomInt(0,temp.length);
        var rand_num = self.getRandomInt(0,100);
        bool = true;
        var tmp_box = null;
        this.state.grid.map(function (el) {
            if(el.active == 0 && bool){
                el.x = temp[rand_int].x;
                el.y = temp[rand_int].y;
                tmp_box = el;
                el.num = rand_num >90?4:2;
                bool = false;
            }
        });
        self.setState({});
        setTimeout(function () {
            tmp_box.active = 1;
            self.setState({});
        },200);
        if(self.state.score > self.state.score_max){
            self.state.score_max = self.state.score;
            localStorage.setItem('score_2048',self.state.score_max);
        }

    },
    isEmpty: function (e) {
        var re = null;
        this.state.grid.map(function (el, i) {
            if (e.x == el.x && e.y == el.y && el.active == 1) {
                re = el;
            }
        });
        return re;
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    componentWillMount: function () {

    },
    render: function () {
        return (
            <div className="game_content">
                {
                    this.state.grid.map(function (box, i) {
                        return <Box key={i} params={box}/>
                    })
                }
                <div className="game_controller">
                    <div className="relative">
                        <div className="btns" onClick={this.toUp}></div>
                        <div className="btns" onClick={this.toRight}></div>
                        <div className="btns" onClick={this.toLeft}></div>
                        <div className="btns" onClick={this.toDown}></div>
                    </div>
                </div>
                <div className="game_info">
                    <h3>{this.state.score_max}</h3>
                    <hr/>
                    <h3>{this.state.score}</h3>
                </div>
            </div>
        );
    }
});


ReactDOM.render(
    <App />,
    document.getElementById("content")
);

