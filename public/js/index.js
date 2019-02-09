webpackJsonp([1],{

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(229)
}
var normalizeComponent = __webpack_require__(31)
/* script */
var __vue_script__ = __webpack_require__(231)
/* template */
var __vue_template__ = __webpack_require__(232)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-384052eb", Component.options)
  } else {
    hotAPI.reload("data-v-384052eb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(33)("5d7ecbd2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-384052eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-384052eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "\n.bottom {\n    margin-top: 13px;\n    line-height: 12px;\n}\n.clearfix:before,.clearfix:after {\n    display: table;\n    content: \"\";\n}\n.clearfix:after {\n    clear: both\n}\n.button {\n    float: right;\n    margin-top: 13px;\n}\n.image {\n    width: 100%;\n    display: block;\n}\n.text {\n    font-size: 13px;\n    color: #999;\n}\n", ""]);

// exports


/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(32);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            objects: [],
            trades: {},
            loading: true
        };
    },
    mounted: function mounted() {
        var _this = this;

        axios.get('/api/stores').then(function (res) {
            _this.objects = res.data;
            return axios.get('/api/stores/trades');
        }).then(function (res) {
            _this.trades = res.data.reduce(function (obj, v) {
                obj[v.id] = v;
                return obj;
            }, {});
            _this.loading = false;
        });
    },

    methods: {
        buy: function buy(id) {
            var _this2 = this;

            this.$confirm('确认兑换？', '提示').then(function () {
                if (_this2.userinfo.conaddress == '') {
                    _this2.$message.error('还没有填写个人信息，请先填写兑换~');
                    return;
                }
                axios.post('/api/stores/' + id + '/trades').then(function (res) {
                    _this2.$set(_this2.trades, id, res.data);
                });
            });
        },
        timecmp: function timecmp(time) {
            return new Date(time) > new Date();
        }
    },
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapState"])(['userinfo']))
});

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ]
    },
    [
      _vm._v(
        "\n    Hello " +
          _vm._s(_vm.userinfo.name) +
          "，你目前的积分数是 " +
          _vm._s(_vm.userinfo.coins) +
          "\n    "
      ),
      _c("br"),
      _vm._v(" "),
      _c(
        "el-row",
        _vm._l(_vm.objects.data, function(object) {
          return _vm.timecmp(object.etime) && object.enabled
            ? _c(
                "el-col",
                { key: object.id, attrs: { span: 6 } },
                [
                  _c("el-card", [
                    _c("img", {
                      staticClass: "image",
                      attrs: { src: object.image }
                    }),
                    _vm._v(" "),
                    _c("div", { staticStyle: { padding: "14px" } }, [
                      _c("span", [
                        _vm._v(
                          "￥" +
                            _vm._s(object.coins) +
                            " - " +
                            _vm._s(object.name)
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "bottom clearfix" },
                        [
                          _c("span", { staticClass: "text" }, [
                            _vm._v(_vm._s(object.text))
                          ]),
                          _vm._v(" "),
                          _vm.userinfo.coins < object.coins
                            ? [
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "button",
                                    attrs: { type: "danger", disabled: "" }
                                  },
                                  [_vm._v("积分不足")]
                                )
                              ]
                            : !object.stock
                              ? [
                                  _c(
                                    "el-button",
                                    {
                                      staticClass: "button",
                                      attrs: { type: "danger", disabled: "" }
                                    },
                                    [_vm._v("库存不足")]
                                  )
                                ]
                              : _vm.timecmp(object.stime)
                                ? [
                                    _c(
                                      "el-button",
                                      {
                                        staticClass: "button",
                                        attrs: { type: "info", disabled: "" }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(object.stime) + " 开始兑换"
                                        )
                                      ]
                                    )
                                  ]
                                : _vm.trades[object.id]
                                  ? [
                                      _c(
                                        "el-button",
                                        {
                                          staticClass: "button",
                                          attrs: { type: "info", disabled: "" }
                                        },
                                        [_vm._v("已兑换")]
                                      )
                                    ]
                                  : [
                                      _c(
                                        "el-button",
                                        {
                                          staticClass: "button",
                                          attrs: { type: "primary" },
                                          on: {
                                            click: function($event) {
                                              _vm.buy(object.id)
                                            }
                                          }
                                        },
                                        [_vm._v("兑换")]
                                      )
                                    ]
                        ],
                        2
                      )
                    ])
                  ])
                ],
                1
              )
            : _vm._e()
        })
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-384052eb", module.exports)
  }
}

/***/ })

});