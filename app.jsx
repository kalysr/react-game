var Grid = [
    {
        x:0,
        y:0,
        active:1,
        num:2
    },{
        x:1,
        y:1,
        active:1,
        num:2
    },{
        x:2,
        y:0,
        active:1,
        num:2
    },{
        x:3,
        y:0,
        active:1,
        num:2
    },
];
var Box =  React.createClass({
    getInitialState: function () {
        return{

        };
    },
    getStyle:function () {
        var p = this.props.params;
        var style = {
            left: ((p.x * 100))+"px",
            top: ((p.y * 100))+"px",
            background: this.getColor(p.num),
            opacity: this.props.params.active
        };
        return style;
    },
    getColor:function (num) {
        return "#ffffff";
    },
    render: function () {
        return (
            <div style={this.getStyle()} className="game_box">
                <h1 className="game_box_num">{this.props.params.num}</h1>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return{
            grid: Grid
        };
    },
    toDown:function () {
        this.state.grid.map(function (el,i) {
            el.y = 3;
        });
        this.setState();
    },
    toLeft:function () {
        var self = this;
        self.findBox();
        this.setState();
    },
    findBox:function () {
        var self = this;
        this.state.grid.map(function (el,i) {
            if(el.x >0 && el.x <= 3){
                var ee = self.isEmpty({x:el.x-1,y:el.y});
                console.log(ee);
                if(ee){
                    if(ee.num == el.num){
                        self.setOpacity(ee);
                        el.x = ee.x;
                        el.num *=2;
                        console.log(el);
                    }
                }else{
                    el.x -= 1;
                }
            }
        });
    },
    isEmpty:function (e) {
        var re = null;
        this.state.grid.map(function (el,i) {
            if(e.x == el.x && e.y == el.y){
                re = el;
            }
        });
        return re;
    },
    setOpacity:function (e) {
        this.state.grid.map(function (el,i) {
            if(e.x == el.x && e.y == el.y){
                el.active = 0;
            }
        });
    },
    toUp:function () {
        this.state.grid.map(function (el,i) {
            el.y = 0;
        });
        this.setState();
    },
    toRight:function () {
        /*this.state.grid.map(function (el,i) {
            el.y = 3;
        });
        this.setState();*/
    },
    componentWillMount:function () {
        window._game = this;
    },
    render: function () {
        return (
            <div className="game_content">
                {
                    this.state.grid.map(function (box,i) {
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
            </div>
        );
    }
});


ReactDOM.render(
    <App />,
    document.getElementById("content")
);

