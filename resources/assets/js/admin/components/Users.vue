<template>
<div v-loading="loading">
    <el-row>
        <el-col :span="24">
            <el-table :data="objects.data" @sort-change="sortObject" stripe>
                <el-table-column prop="name" label="贴吧账号" sortable="custom">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <p>收件人姓名：{{ scope.row.conname }}<br>收件地址：{{ scope.row.conaddress }}<br>收件电话：{{ scope.row.conphone }}<br></p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="coins" label="账号积分" sortable="custom"></el-table-column>
                <el-table-column prop="created_at" label="注册时间" sortable="custom"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="editObject(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteObject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <!-- <el-button @click="newObject">新建账号</el-button> -->
            <div class="block">
                <el-pagination @current-change="changePage" :current-page.sync="objects.current_page" :page-size="parseInt(objects.per_page)" layout="prev, pager, next, jumper" :total="objects.total">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="formShow">
        <el-form :model="form">
            <el-form-item label="账号名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="积分数">
                <el-input type="number" v-model="form.coins"></el-input>
            </el-form-item>
            <el-form-item label="收件人姓名">
                <el-input v-model="form.conname"></el-input>
            </el-form-item>
            <el-form-item label="收件地址">
                <el-input v-model="form.conaddress"></el-input>
            </el-form-item>
            <el-form-item label="收件电话">
                <el-input v-model="form.conphone"></el-input>
            </el-form-item>
            <el-form-item label="BDUSS">
                <el-input v-model="form.bduss"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="formShow = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
    export default {
        data () {
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
            }
        },
        methods: {
            submitForm () {
                this.formShow = false;
                if (this.formIndex == -1) {
                    axios.post('/admin/api/users', this.form).then(res => {
                        this.objects.data.push(res.data);
                    });
                } else {
                    let patchid = this.objects.data[this.formIndex].id;
                    axios.patch('/admin/api/users/' + patchid, this.form).then(res => {
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
                this.formIndex = index;
                this.formShow = true;
            },
            deleteObject (index, row) {
                this.objects.data.splice(index, 1);
                axios.delete('/admin/api/users/' + row.id);
            },
            changePage (currentPage) {
                this.loading = true;
                axios.get('/admin/api/users?page=' + currentPage).then((res) => {
                    this.objects = res.data;
                    this.loading = false;
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
            axios.get('/admin/api/users').then((res) => {
                this.objects = res.data;
                this.loading = false;
            });
        }
    }
</script>