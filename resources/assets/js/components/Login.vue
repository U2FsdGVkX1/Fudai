<template>
<div>
    <el-row type="flex" justify="center">
        <el-col :span="24"><el-alert title="请使用手机贴吧扫码登录" type="info" :closable="false"></el-alert></el-col>
    </el-row>
    <br>
    <el-row type="flex" justify="center">
        <el-col :span="6"><img :src="imgurl"></el-col>
    </el-row>
</div>
</template>

<script>
    import Jsonp from 'jsonp-promise';
    export default {
        data () {
            return {
                imgurl: ''
            }
        },
        async mounted () {
            var time = new Date().getTime();
            var url = 'https://passport.baidu.com/v2/api/getqrcode?lp=pc&gid=07D9D20-91EB-43D8-8553-16A98A0B24AA&apiver=v3&tt=' + time;
            var data = await Jsonp(url, null).promise;
            if (!data.errno) {
                this.imgurl = 'https://' + data.imgurl;
                
                url = 'https://passport.baidu.com/channel/unicast?channel_id=' + data.sign + '&tpl=pp&gid=07D9D20-91EB-43D8-8553-16A98A0B24AA&apiver=v3&tt=' + time;
                do {
                    data = await Jsonp(url, {timeout: 0}).promise;
                    if (!data.errno) {
                        var tmp = eval('(' + data.channel_v + ')');
                    } else if (data.errno == 1) {
                        var tmp = { status: 1 };
                    } else {
                        return;
                    }
                } while (tmp.status);
                axios.post('/api/loginqr', {
                    channel_v: tmp.v
                }).then((res) => {
                    this.$router.push({ name: 'Index' })
                });
            }
        }
    }
</script>
