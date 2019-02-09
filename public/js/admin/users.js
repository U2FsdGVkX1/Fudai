webpackJsonp([4],{

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(31)
/* script */
var __vue_script__ = __webpack_require__(225)
/* template */
var __vue_template__ = __webpack_require__(226)
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
Component.options.__file = "resources\\assets\\js\\admin\\components\\Users.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47f5924e", Component.options)
  } else {
    hotAPI.reload("data-v-47f5924e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
            objects: {},
            form: {
                name: undefined,
                password: undefined,
                coins: 0,
                conname: undefined,
                conaddress: undefined,
                conphone: undefined,
                bduss: undefined
            },
            formShow: false,
            formIndex: -1,
            loading: true
        };
    },

    methods: {
        submitForm: function submitForm() {
            var _this = this;

            this.formShow = false;
            if (this.formIndex == -1) {
                axios.post('/admin/api/users', this.form).then(function (res) {
                    _this.objects.data.push(res.data);
                });
            } else {
                var patchid = this.objects.data[this.formIndex].id;
                axios.patch('/admin/api/users/' + patchid, this.form).then(function (res) {
                    _this.$set(_this.objects.data, _this.formIndex, res.data);
                });
            }
        },
        newObject: function newObject() {
            // 清空
            for (var key in this.form) {
                if (typeof this.form[key] == 'number') this.form[key] = 0;else this.form[key] = undefined;
            }
            this.formIndex = -1;
            this.formShow = true;
        },
        editObject: function editObject(index, row) {
            for (var key in this.form) {
                if (row[key]) {
                    this.form[key] = row[key];
                }
            }
            this.formIndex = index;
            this.formShow = true;
        },
        deleteObject: function deleteObject(index, row) {
            this.objects.data.splice(index, 1);
            axios.delete('/admin/api/users/' + row.id);
        },
        changePage: function changePage(currentPage) {
            var _this2 = this;

            this.loading = true;
            axios.get('/admin/api/users?page=' + currentPage).then(function (res) {
                _this2.objects = res.data;
                _this2.loading = false;
            });
        },
        sortObject: function sortObject(obj) {
            if (!obj.prop) return;
            this.objects.data.sort(function (a, b) {
                var ret = 0;
                if (typeof a[obj.prop] == 'number') ret = a[obj.prop] - b[obj.prop];else ret = a[obj.prop].localeCompare(b[obj.prop]);
                if (obj.order == 'descending') {
                    ret = -ret;
                }
                return ret;
            });
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        axios.get('/admin/api/users').then(function (res) {
            _this3.objects = res.data;
            _this3.loading = false;
        });
    }
});

/***/ }),

/***/ 226:
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
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c(
                "el-table",
                {
                  attrs: { data: _vm.objects.data, stripe: "" },
                  on: { "sort-change": _vm.sortObject }
                },
                [
                  _c("el-table-column", {
                    attrs: {
                      prop: "name",
                      label: "贴吧账号",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "el-popover",
                              {
                                attrs: { trigger: "hover", placement: "right" }
                              },
                              [
                                _c("p", [
                                  _vm._v(
                                    "收件人姓名：" + _vm._s(scope.row.conname)
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "收件地址：" + _vm._s(scope.row.conaddress)
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "收件电话：" + _vm._s(scope.row.conphone)
                                  ),
                                  _c("br")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "name-wrapper",
                                    attrs: { slot: "reference" },
                                    slot: "reference"
                                  },
                                  [
                                    _c(
                                      "el-tag",
                                      { attrs: { size: "medium" } },
                                      [_vm._v(_vm._s(scope.row.name))]
                                    )
                                  ],
                                  1
                                )
                              ]
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "coins",
                      label: "账号积分",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "created_at",
                      label: "注册时间",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "操作" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "el-button",
                              {
                                attrs: { size: "mini", type: "info" },
                                on: {
                                  click: function($event) {
                                    _vm.editObject(scope.$index, scope.row)
                                  }
                                }
                              },
                              [_vm._v("编辑")]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                attrs: { size: "mini", type: "danger" },
                                on: {
                                  click: function($event) {
                                    _vm.deleteObject(scope.$index, scope.row)
                                  }
                                }
                              },
                              [_vm._v("删除")]
                            )
                          ]
                        }
                      }
                    ])
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
        "el-row",
        [
          _c("el-col", { attrs: { span: 24 } }, [
            _c(
              "div",
              { staticClass: "block" },
              [
                _c("el-pagination", {
                  attrs: {
                    "current-page": _vm.objects.current_page,
                    "page-size": parseInt(_vm.objects.per_page),
                    layout: "prev, pager, next, jumper",
                    total: _vm.objects.total
                  },
                  on: {
                    "current-change": _vm.changePage,
                    "update:currentPage": function($event) {
                      _vm.$set(_vm.objects, "current_page", $event)
                    }
                  }
                })
              ],
              1
            )
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "提示", visible: _vm.formShow },
          on: {
            "update:visible": function($event) {
              _vm.formShow = $event
            }
          }
        },
        [
          _c(
            "el-form",
            { attrs: { model: _vm.form } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "账号名" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.name,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "name", $$v)
                      },
                      expression: "form.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "密码" } },
                [
                  _c("el-input", {
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
                { attrs: { label: "积分数" } },
                [
                  _c("el-input", {
                    attrs: { type: "number" },
                    model: {
                      value: _vm.form.coins,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "coins", $$v)
                      },
                      expression: "form.coins"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "收件人姓名" } },
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
                { attrs: { label: "收件地址" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.conaddress,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "conaddress", $$v)
                      },
                      expression: "form.conaddress"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "收件电话" } },
                [
                  _c("el-input", {
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
                { attrs: { label: "BDUSS" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.bduss,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "bduss", $$v)
                      },
                      expression: "form.bduss"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.formShow = false
                    }
                  }
                },
                [_vm._v("取消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { attrs: { type: "primary" }, on: { click: _vm.submitForm } },
                [_vm._v("确定")]
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
    require("vue-hot-reload-api")      .rerender("data-v-47f5924e", module.exports)
  }
}

/***/ })

});