webpackJsonp([2],{

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(31)
/* script */
var __vue_script__ = __webpack_require__(239)
/* template */
var __vue_template__ = __webpack_require__(240)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
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
Component.options.__file = "resources\\assets\\js\\components\\Profile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22ef5402", Component.options)
  } else {
    hotAPI.reload("data-v-22ef5402", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_area_linkage__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_area_linkage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_area_linkage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(32);
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




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_area_linkage___default.a);

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            form: {
                password: undefined,
                conname: this.$store.state.userinfo.conname,
                conaddress: '',
                conphone: this.$store.state.userinfo.conphone,
                tmpaddress: [],
                tmpaddress2: ''
            },
            rules: {
                conname: [{ required: true, message: '请输入收件人姓名', trigger: 'blur' }],
                tmpaddress2: [{ required: true, message: '请输入收件地址', trigger: 'blur' }],
                conphone: [{ required: true, message: '请输入收件电话', trigger: 'blur' }, { min: 11, max: 11, message: '手机号不正确', trigger: 'blur' }]
            },
            loading: false
        };
    },
    mounted: function mounted() {
        var address = this.$store.state.userinfo.conaddress.split(' ');
        if (address.length >= 5) {
            this.$set(this.form.tmpaddress, 0, address[0]);
            this.$set(this.form.tmpaddress, 1, address[1]);
            this.$set(this.form.tmpaddress, 2, address[2]);
            this.$set(this.form.tmpaddress, 3, address[3]);
            this.form.tmpaddress2 = address[4];
        } else {
            this.form.tmpaddress = ['北京市', '市辖区', '东城区', '东华门街道'];
        }
    },

    methods: {
        submitForm: function submitForm() {
            var _this = this;

            this.form.conaddress = [this.form.tmpaddress[0], this.form.tmpaddress[1], this.form.tmpaddress[2], this.form.tmpaddress[3], this.form.tmpaddress2].join(' ');

            this.$refs['form'].validate(function (valid) {
                if (!valid) {
                    return false;
                }
                axios.patch('/api/users', _this.form).then(function (res) {
                    location.reload();
                });
            });
        }
    }
});

/***/ }),

/***/ 240:
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
      _c("br"),
      _vm._v(" "),
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { span: 23 } },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  attrs: {
                    model: _vm.form,
                    rules: _vm.rules,
                    "label-width": "100px"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "修改密码", prop: "password" } },
                    [
                      _c("el-input", {
                        attrs: {
                          type: "password",
                          placeholder: "设置密码以使用普通登录（留空为不设置）"
                        },
                        model: {
                          value: _vm.form.password,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "password", $$v)
                          },
                          expression: "form.password"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "收件人姓名", prop: "conname" } },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.form.conname,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "conname", $$v)
                          },
                          expression: "form.conname"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "收件地址", prop: "tmpaddress2" } },
                    [
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            {
                              staticStyle: { "margin-left": "-10px" },
                              attrs: { span: 12 }
                            },
                            [
                              _c("area-select", {
                                attrs: { level: 3, type: "text" },
                                model: {
                                  value: _vm.form.tmpaddress,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "tmpaddress", $$v)
                                  },
                                  expression: "form.tmpaddress"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-col",
                            { attrs: { span: 12 } },
                            [
                              _c("el-input", {
                                model: {
                                  value: _vm.form.tmpaddress2,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "tmpaddress2", $$v)
                                  },
                                  expression: "form.tmpaddress2"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "收件电话", prop: "conphone" } },
                    [
                      _c("el-input", {
                        attrs: { type: "number" },
                        model: {
                          value: _vm.form.conphone,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "conphone", $$v)
                          },
                          expression: "form.conphone"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { staticStyle: { float: "right" } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: { click: _vm.submitForm }
                        },
                        [_vm._v("保存")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
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
    require("vue-hot-reload-api")      .rerender("data-v-22ef5402", module.exports)
  }
}

/***/ })

});