<template>
<div v-loading="loading">
    <el-row>
        <el-col :span="24">
            <el-table :data="objects.data" @sort-change="sortObject" stripe>
                <el-table-column prop="name" label="商品名称" sortable="custom">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <p>{{ scope.row.text }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="商品数量" sortable="custom"></el-table-column>
                <el-table-column prop="coins" label="商品兑换所需积分" sortable="custom"></el-table-column>
                <el-table-column prop="stime" label="商品开始兑换时间" sortable="custom"></el-table-column>
                <el-table-column prop="etime" label="商品结束兑换时间" sortable="custom"></el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button size="mini" type="normal" @click="showTrades(scope.$index, scope.row)">兑换信息</el-button>
                        <template v-if="scope.row.enabled == 0">
                            <el-button size="mini" type="success" @click="switchObject(scope.$index, scope.row)">上架</el-button>
                        </template>
                        <template v-else>
                            <el-button size="mini" type="primary" @click="switchObject(scope.$index, scope.row)">下架</el-button>
                        </template>
                        <el-button size="mini" type="info" @click="editObject(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteObject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-button type="success" @click="newObject">新建商品</el-button>
            <div style="float: right">
                <el-button type="warning" @click="downloadTrades">保存全部兑换记录</el-button>
                <el-button type="danger" @click="clearTrades">删除全部兑换记录</el-button>
            </div>
        </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="formShow">
        <el-form :model="form">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="form.text"></el-input>
            </el-form-item>
            <el-form-item label="商品图片地址">
                <el-input v-model="form.image"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input type="number" v-model="form.stock"></el-input>
            </el-form-item>
            <el-form-item label="商品兑换所需积分">
                <el-input type="number" v-model="form.coins"></el-input>
            </el-form-item>
            <el-form-item label="商品开始兑换时间">
                <el-date-picker v-model="form.stime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="formShow = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="tradesShow">
        <el-table :data="trades">
            <el-table-column prop="name" label="兑换者" sortable></el-table-column>
            <el-table-column prop="pivot.created_at" label="兑换时间" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" @click="updateTrades(scope.$index, scope.row)">发货单号</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>

<script>
    import FileSaver from 'file-saver';

    export default {
        data () {
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
            }
        },
        methods: {
            submitForm () {
                this.formShow = false;
                this.form.etime = this.form.stime[1];
                this.form.stime = this.form.stime[0];
                if (this.formIndex == -1) {
                    axios.post('/admin/api/stores', this.form).then(res => {
                        this.objects.data.push(res.data);
                    });
                } else {
                    let patchid = this.objects.data[this.formIndex].id;
                    axios.patch('/admin/api/stores/' + patchid, this.form).then(res => {
                        this.$set(this.objects.data, this.formIndex, res.data);
                    });
                }
            },
            newObject () {
                // 清空
                for (let key in this.form) {
                    if (typeof this.form[key] == 'number')
                        this.form[key] = 0;
                    else
                        this.form[key] = undefined;
                }
                this.formIndex = -1;
                this.formShow = true;
            },
            editObject (index, row) {
                for (let key in this.form) {
                    if (row[key]) {
                        this.form[key] = row[key];
                    }
                }
                this.form.stime = [
                    this.form.stime,
                    this.form.etime
                ];
                this.formIndex = index;
                this.formShow = true;
            },
            switchObject (index, row) {
                row.enabled = !row.enabled;
                axios.patch('/admin/api/stores/' + row.id, {
                    enabled: row.enabled
                });
            },
            deleteObject (index, row) {
                this.$confirm('删除该商品？', '提示').then(() => {
                    this.objects.data.splice(index, 1);
                    axios.delete('/admin/api/stores/' + row.id);
                });
            },
            showTrades (index, row) {
                this.trades = row.users;
                this.tradesShow = true;
            },
            updateTrades (index, row) {
                this.$prompt('请输入快递单号', '提示').then(({ value }) => {
                    axios.patch('/admin/api/stores/trades/' + row.id, {
                        'tno': value
                    });
                });
            },
            downloadTrades () {
                axios.get('/admin/api/stores/trades').then((res) => {
                    let text = res.data.map((tradeInfo) => {
                        return [
                            tradeInfo.user.name,
                            tradeInfo.store.name,
                            tradeInfo.created_at,
                            tradeInfo.user.conname,
                            tradeInfo.user.conaddress,
                            tradeInfo.user.conphone
                        ].join('|');
                    });
                    text.unshift('兑换者|兑换商品|兑换时间|兑换者姓名|兑换者地址|兑换者电话');
                    text = text.join('\r\n');
                    let textBlob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                    FileSaver.saveAs(textBlob, 'download.txt');
                });
            },
            clearTrades () {
                this.$confirm('清空全部兑换记录？', '提示').then(() => {
                    axios.delete('/admin/api/stores/trades');
                });
            },
            sortObject (obj) {
                if (!obj.prop) return;
                this.objects.data.sort((a, b) => {
                    let ret = 0;
                    if (typeof a[obj.prop] == 'number')
                        ret = a[obj.prop] - b[obj.prop];
                    else
                        ret = a[obj.prop].localeCompare(b[obj.prop]);
                    if (obj.order == 'descending') {
                        ret = -ret;
                    }
                    return ret;
                });
            }
        },
        mounted () {
            axios.get('/admin/api/stores').then((res) => {
                this.objects = res.data;
                this.loading = false;
            });
        }
    }
</script>