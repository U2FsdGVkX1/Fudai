<template>
<div>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="/admin" mode="horizontal" router>
        <el-menu-item index="/admin" :route="{name: 'Index'}">首页</el-menu-item>
        <el-menu-item index="/admin/users" :route="{name: 'Users'}">用户管理</el-menu-item>
        <el-menu-item index="/admin/stores" :route="{name: 'Stores'}">商品管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>
</template>

<style>
    body {
        margin: 0px;
    }
</style>