<template>
<div v-loading="loading">
    <br>
    <el-row>
        <el-col :span="23">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="修改密码" prop="password">
                    <el-input type="password" placeholder="设置密码以使用普通登录（留空为不设置）" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="收件人姓名" prop="conname">
                    <el-input v-model="form.conname"></el-input>
                </el-form-item>
                <el-form-item label="收件地址" prop="tmpaddress2">
                    <el-row>
                        <el-col :span="12" style="margin-left: -10px">
                            <area-select :level="3" type="text" v-model="form.tmpaddress"></area-select>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="form.tmpaddress2"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="收件电话" prop="conphone">
                    <el-input type="number" v-model="form.conphone"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
    import Vue from 'vue';
    import VueAreaLinkage from 'vue-area-linkage';
    import { mapState } from 'vuex';
    Vue.use(VueAreaLinkage);

    export default {
        data() {
            return {
                form: {
                    password: undefined,
                    conname: this.$store.state.userinfo.conname,
                    conaddress: '',
                    conphone: this.$store.state.userinfo.conphone,
                    tmpaddress: [],
                    tmpaddress2: '',
                },
                rules: {
                    conname: [
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' }
                    ],
                    tmpaddress2: [
                        { required: true, message: '请输入收件地址', trigger: 'blur' }
                    ],
                    conphone: [
                        { required: true, message: '请输入收件电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '手机号不正确', trigger: 'blur' }
                    ],
                },
                loading: false
            }
        },
        mounted() {
            let address = this.$store.state.userinfo.conaddress.split(' ');
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
            submitForm () {
                this.form.conaddress = [
                    this.form.tmpaddress[0],
                    this.form.tmpaddress[1],
                    this.form.tmpaddress[2],
                    this.form.tmpaddress[3],
                    this.form.tmpaddress2
                ].join(' ');

                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    axios.patch('/api/users', this.form).then((res) => {
                        location.reload();
                    });
                });
            }
        }
    }
</script>