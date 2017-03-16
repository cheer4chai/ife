/**
 * Created by DELL-PC on 2017/3/16.
 */
(function (window) {

    var dialog = function (opt) {
        var opt = opt || {};
        this.title = opt.title || '提示';
        this.content = opt.content || '';
        this.btn = opt.btn || [{
                name: '关闭',
                callback: function () {
                    console.log('123');
                    return false;
                }
            }];
        this.width = opt.width || 400;
        this.height = opt.height || 200;
        this.wrapCss = [{
            name: 'position',
            style: 'fixed'
        },{
            name: 'top',
            style: '0'
        },{
            name: 'width',
            style: '100%'
        },{
            name: 'height',
            style: '100%'
        },{
            name: 'backgroundColor',
            style: 'rgba(0,0,0,0.6)'
        }];
        this.boxCss = [{
            name: 'width',
            style: this.width+'px'
        },{
            name: 'minHeight',
            style: this.height+'px'
        },{
            name: 'position',
            style:'absolute'
        },{
            name: 'top',
            style: '50%'
        },{
            name: 'left',
            style: '50%'
        },{
            name: 'marginLeft',
            style: -this.width/2+'px'
        },{
            name: 'marginTop',
            style: -this.height/2+'px'
        },{
            name: 'backgroundColor',
            style: 'white'
        },{
            name: 'textAlign',
            style: 'center'
        }];
        this.titleCss = [{
            name: 'height',
            style: '50px'
        },{
            name: 'lineHeight',
            style: '50px'
        },{
            name: 'color',
            style: 'white'
        },{
            name: 'backgroundColor',
            style: 'blue'
        },{
            name: 'fontSize',
            style: '16px'
        }];
        this.contentCss = [{
            name: 'margin',
            style: '10px'
        },{
            name: 'lineHeight',
            style: '24px'
        },{
            name: 'fontSize',
            style: '16px'
        },{
            name: 'minHeight',
            style: '60px'
        }];
        this.btnCss = [{
            name:  'width',
            style: '60px'
        },{
            name:  'height',
            style: '30px'
        },{
            name:  'color',
            style: 'white'
        },{
            name:  'backgroundColor',
            style: 'blue'
        },{
            name:  'marginTop',
            style: '10px'
        },{
            name:  'border',
            style: 'none'
        },{
            name:  'borderRadius',
            style: '5px'
        },{
            name:  'cursor',
            style: 'pointer'
        },{
            name:  'marginLeft',
            style: '10px'
        },{
            name:  'verticalAlign',
            style: 'middle'
        }];
        this.initialization();

    };

    dialog.prototype = {
        constructor: dialog,

        _addDom: function () {
            var _this = this;
            var _tmp = '<div class="dialogBox"><div class="dialogTitle">' + _this.title + '</div><div class="dialogContent">'+ _this.content +'</div><div>';
            for(var i=0;i<this.btn.length;i++){
                _tmp += '<button class="btn" id="button_'+ i +'">'+ this.btn[i].name +'</button>'
            }
            _tmp += ' </div></div>';
            var divTmp = document.createElement('div');
            divTmp.className = 'dialogWrap';
            divTmp.innerHTML = _tmp;
            document.body.appendChild(divTmp);
        },
        _addStyle: function () {
            this._setWrapper();
            this._setBox();
            this._setTitle();
            this._setContent();
            this._setButton();
        },
        _setWrapper: function () {
            var wrapper = document.getElementsByClassName('dialogWrap')[0];
            for(var i=0;i<this.wrapCss.length;i++) {
                wrapper.style[this.wrapCss[i].name] = this.wrapCss[i].style;
            }
        },
        _setBox: function () {
          var box = document.getElementsByClassName('dialogBox')[0];
          console.log(this.boxCss)
          for(var i=0;i<this.boxCss.length;i++) {
              box.style[this.boxCss[i].name] = this.boxCss[i].style;
          }
        },
        _setTitle: function () {
            var title = document.getElementsByClassName('dialogTitle')[0];
            for(var i=0;i<this.titleCss.length;i++) {
                title.style[this.titleCss[i].name] = this.titleCss[i].style;
            }
        },
        _setContent: function () {
            var content = document.getElementsByClassName('dialogContent')[0];
            for(var i=0;i<this.contentCss.length;i++) {
                content.style[this.contentCss[i].name] = this.contentCss[i].style;
            }
        },
        _setButton: function () {
            var btn = document.getElementsByClassName('btn');
            for(var j=0;j<btn.length;j++){
                for(var i=0;i<this.btnCss.length;i++) {
                    btn[j].style[this.btnCss[i].name] = this.btnCss[i].style;
                }
            }

        },
        _addbuttonEvent: function () {
            var _this = this;
            var btn = _this.btn;
            for(var i=0;i<btn.length;i++) {
                (function (arg) {
                    document.getElementById('button_'+ arg).onclick = function () {
                        var flag = btn[arg].callback && btn[arg].callback();
                        if (flag == false) {_this._destroy();}
                    }
                })(i);
            }
        },
        _destroy: function () {
            document.body.removeChild(document.getElementsByClassName('dialogWrap')[0]);
        },
        initialization: function () {
            this._addDom();
            this._addStyle();
            this._addbuttonEvent();
        }
    };

    window.dialog = dialog;

})(window)