<template>
<div v-loading="loading">
    <el-row>
        <el-col :span="24">
            <el-table :data="objects.data">
                <el-table-column prop="text" label="内容" sortable></el-table-column>
                <el-table-column prop="created_at" label="时间" sortable></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                objects: {},
                loading: true
            }
        },
        mounted() {
            axios.get('/api/logs?order=desc').then((res) => {
                this.objects = res.data;
                this.loading = false;
            });
        },
        methods: {
        }
    }
</script>