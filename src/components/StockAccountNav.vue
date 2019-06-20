<template>
    <div>
        
        <div :style="{width:width}" class="nav-side" v-for="(account_belong,index) in account_belong_list">
            <div class="nav-item" @click="onClick(account_belong)">{{account_belong.$account.name}}-{{account_belong.name}}</div>
        </div>
    </div>
</template>

<script>
    import "../css/sidenav.css";
    import helper from '../util/helper';
    import http from '../util/http';


    export default {
       props:{
            width:[ 'width' ],
       } ,
       data() {
           return {
               account_belong_list:[],
               user_id:helper.get('uinfo')[0].id,
               real: [], //最新股票数据
           }
       },
       methods: {
           read_account_belong() {
                http.post("account_belong/read",{
                    where:{
                    user_id:this.user_id,
                    },
                    with:[
                        {model:'account',relation:'has_one'}
                    ]
                }).then(r => {
                    this.account_belong_list = r.data;
                });
            },
            onClick(row){
                this.$emit('getPerAccount',row)
            }
       },
       mounted() {
           this.read_account_belong();
       },
    }
</script>

<style scoped>
    .router-link-active {
        background: #CBA58C;
        color: #fff;
    }

</style>
