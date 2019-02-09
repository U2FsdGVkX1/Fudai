<template>
<div v-loading="loading">
    Hello {{ userinfo.name }}，你目前的积分数是 {{ userinfo.coins }}
    <br>
    <el-row>
        <el-col :span="6" v-for="object in objects.data" v-if="timecmp(object.etime) && object.enabled" :key="object.id">
            <el-card>
                <img :src="object.image" class="image">
                <div style="padding: 14px;">
                    <span>￥{{ object.coins }} - {{ object.name }}</span>
                    <div class="bottom clearfix">
                        <span class="text">{{ object.text }}</span>
                        <template v-if="userinfo.coins < object.coins">
                            <el-button type="danger" class="button" disabled>积分不足</el-button>
                        </template>
                        <template v-else-if="!object.stock">
                            <el-button type="danger" class="button" disabled>库存不足</el-button>
                        </template>
                        <template v-else-if="timecmp(object.stime)">
                            <el-button type="info" class="button" disabled>{{ object.stime }} 开始兑换</el-button>
                        </template>
                        <template v-else-if="trades[object.id]">
                            <el-button type="info" class="button" disabled>已兑换</el-button>
                        </template>
                        <template v-else>
                            <el-button type="primary" class="button" @click="buy(object.id)">兑换</el-button>
                        </template>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                objects: [],
                trades: {},
                loading: true
            }
        },
        mounted () {
            axios.get('/api/stores').then((res) => {
                this.objects = res.data;
                return axios.get('/api/stores/trades');
            }).then((res) => {
                this.trades = res.data.reduce((obj, v) => {
                    obj[v.id] = v;
                    return obj;
                }, {});
                this.loading = false;
            });
        },
        methods: {
            buy(id) {
                this.$confirm('确认兑换？', '提示').then(() => {
                    if (this.userinfo.conaddress == '') {
                        this.$message.error('还没有填写个人信息，请先填写兑换~');
                        return;
                    }
                    axios.post('/api/stores/' + id + '/trades').then((res) => {
                        this.$set(this.trades, id, res.data);
                    });
                });
            },
            timecmp(time) {
                return new Date(time) > new Date();
            }
        },
        computed: {
            ...mapState(['userinfo'])
        }
    }
</script>

<style>
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .clearfix:before,.clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .button {
        float: right;
        margin-top: 13px;
    }
    .image {
        width: 100%;
        display: block;
    }
    .text {
        font-size: 13px;
        color: #999;
    }
</style>