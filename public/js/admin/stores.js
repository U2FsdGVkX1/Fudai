webpackJsonp([5],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(31)
/* script */
var __vue_script__ = __webpack_require__(227)
/* template */
var __vue_template__ = __webpack_require__(228)
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
Component.options.__file = "resources\\assets\\js\\admin\\components\\Stores.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d01cd5c", Component.options)
  } else {
    hotAPI.reload("data-v-5d01cd5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_saver__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_file_saver__);
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
                text: undefined,
                image: undefined,
                stock: undefined,
                coins: undefined,
                stime: undefined,
                etime: undefined
            },
            formShow: false,
            formIndex: -1,

            trades: [],
            tradesShow: false,

            loading: true
        };
    },

    methods: {
        submitForm: function submitForm() {
            var _this = this;

            this.formShow = false;
            this.form.etime = this.form.stime[1];
            this.form.stime = this.form.stime[0];
            if (this.formIndex == -1) {
                axios.post('/admin/api/stores', this.form).then(function (res) {
                    _this.objects.data.push(res.data);
                });
            } else {
                var patchid = this.objects.data[this.formIndex].id;
                axios.patch('/admin/api/stores/' + patchid, this.form).then(function (res) {
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
            this.form.stime = [this.form.stime, this.form.etime];
            this.formIndex = index;
            this.formShow = true;
        },
        switchObject: function switchObject(index, row) {
            row.enabled = !row.enabled;
            axios.patch('/admin/api/stores/' + row.id, {
                enabled: row.enabled
            });
        },
        deleteObject: function deleteObject(index, row) {
            var _this2 = this;

            this.$confirm('删除该商品？', '提示').then(function () {
                _this2.objects.data.splice(index, 1);
                axios.delete('/admin/api/stores/' + row.id);
            });
        },
        showTrades: function showTrades(index, row) {
            this.trades = row.users;
            this.tradesShow = true;
        },
        updateTrades: function updateTrades(index, row) {
            this.$prompt('请输入快递单号', '提示').then(function (_ref) {
                var value = _ref.value;

                axios.patch('/admin/api/stores/trades/' + row.id, {
                    'tno': value
                });
            });
        },
        downloadTrades: function downloadTrades() {
            axios.get('/admin/api/stores/trades').then(function (res) {
                var text = res.data.map(function (tradeInfo) {
                    return [tradeInfo.user.name, tradeInfo.store.name, tradeInfo.created_at, tradeInfo.user.conname, tradeInfo.user.conaddress, tradeInfo.user.conphone].join('|');
                });
                text.unshift('兑换者|兑换商品|兑换时间|兑换者姓名|兑换者地址|兑换者电话');
                text = text.join('\r\n');
                var textBlob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                __WEBPACK_IMPORTED_MODULE_0_file_saver___default.a.saveAs(textBlob, 'download.txt');
            });
        },
        clearTrades: function clearTrades() {
            this.$confirm('清空全部兑换记录？', '提示').then(function () {
                axios.delete('/admin/api/stores/trades');
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

        axios.get('/admin/api/stores').then(function (res) {
            _this3.objects = res.data;
            _this3.loading = false;
        });
    }
});

/***/ }),

/***/ 228:
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
                      label: "商品名称",
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
                                _c("p", [_vm._v(_vm._s(scope.row.text))]),
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
                      prop: "stock",
                      label: "商品数量",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "coins",
                      label: "商品兑换所需积分",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "stime",
                      label: "商品开始兑换时间",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "etime",
                      label: "商品结束兑换时间",
                      sortable: "custom"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "操作", width: "350" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "el-button",
                              {
                                attrs: { size: "mini", type: "normal" },
                                on: {
                                  click: function($event) {
                                    _vm.showTrades(scope.$index, scope.row)
                                  }
                                }
                              },
                              [_vm._v("兑换信息")]
                            ),
                            _vm._v(" "),
                            scope.row.enabled == 0
                              ? [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { size: "mini", type: "success" },
                                      on: {
                                        click: function($event) {
                                          _vm.switchObject(
                                            scope.$index,
                                            scope.row
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("上架")]
                                  )
                                ]
                              : [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { size: "mini", type: "primary" },
                                      on: {
                                        click: function($event) {
                                          _vm.switchObject(
                                            scope.$index,
                                            scope.row
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("下架")]
                                  )
                                ],
                            _vm._v(" "),
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
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c(
                "el-button",
                { attrs: { type: "success" }, on: { click: _vm.newObject } },
                [_vm._v("新建商品")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticStyle: { float: "right" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "warning" },
                      on: { click: _vm.downloadTrades }
                    },
                    [_vm._v("保存全部兑换记录")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "danger" },
                      on: { click: _vm.clearTrades }
                    },
                    [_vm._v("删除全部兑换记录")]
                  )
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
                { attrs: { label: "商品名称" } },
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
                { attrs: { label: "商品描述" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.text,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "text", $$v)
                      },
                      expression: "form.text"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "商品图片地址" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.image,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "image", $$v)
                      },
                      expression: "form.image"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "商品数量" } },
                [
                  _c("el-input", {
                    attrs: { type: "number" },
                    model: {
                      value: _vm.form.stock,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "stock", $$v)
                      },
                      expression: "form.stock"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "商品兑换所需积分" } },
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
                { attrs: { label: "商品开始兑换时间" } },
                [
                  _c("el-date-picker", {
                    attrs: {
                      "value-format": "yyyy-MM-dd HH:mm:ss",
                      type: "datetimerange",
                      "range-separator": "至"
                    },
                    model: {
                      value: _vm.form.stime,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "stime", $$v)
                      },
                      expression: "form.stime"
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "提示", visible: _vm.tradesShow },
          on: {
            "update:visible": function($event) {
              _vm.tradesShow = $event
            }
          }
        },
        [
          _c(
            "el-table",
            { attrs: { data: _vm.trades } },
            [
              _c("el-table-column", {
                attrs: { prop: "name", label: "兑换者", sortable: "" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "pivot.created_at",
                  label: "兑换时间",
                  sortable: ""
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
                                _vm.updateTrades(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("发货单号")]
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
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d01cd5c", module.exports)
  }
}

/***/ })

});