<template>
<div>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="/" mode="horizontal" router>
        <el-menu-item index="/" :route="{name: 'Index'}">首页</el-menu-item>
        <el-menu-item index="/logs" :route="{name: 'Logs'}">日志</el-menu-item>
        <el-menu-item index="/profile" :route="{name: 'Profile'}">个人信息</el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>
</template>

<style>
    body {
        margin: 0px;
    }
</style>
