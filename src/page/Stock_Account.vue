<template>
    <div>
        <vue-ins-progress-bar></vue-ins-progress-bar>
        <div>
            <div class="container">
                <div class="col-lg-3">
                    <StockAccountNav @getPerAccount="getPerAccount"/>
                </div>
                <div class="col-lg-9  card">
                    <div class="title">
                        账户类别： 
                        {{perAccountInfo.$account ? perAccountInfo.$account.name :'-'}}-{{perAccountInfo.name ? perAccountInfo.name  :'-'}}
                    </div>
                    <div class="board">
                        <div class="row">
                            <div class="col-lg-4">总资产
                                <br>
                                <div class="font-bold">{{total_value}}</div>
                            </div>
                            <div class="col-lg-4">持仓盈亏
                                <br>
                                <div class="font-bold">{{total_cost_value - cash_info.shares}}</div>
                            </div>
                            <div class="col-lg-4">可用
                                <br>
                                <div class="font-bold">{{cash_info.shares}}</div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-lg-4">总资产
                                <br>
                                <div class="font-bold">10000</div>
                            </div>
                            <div class="col-lg-4">持仓盈亏
                                <br>
                                <div class="font-bold">10000</div>
                            </div>
                            <div class="col-lg-4">可用
                                <br>
                                <div class="font-bold">10000</div>
                            </div>
                        </div> -->
                    </div>
                    <div class="main">
                        <table>
                            <thead class="thead">
                                <tr>
                                    <th>股票/市值</th>
                                    <th>持仓/可用</th>
                                    <th>现价/成本</th>
                                    <th>盈亏</th>
                                </tr>
                            </thead>
                            <tbody v-for="(row,index) in concat_new_stock">
                                <tr>
                                    <td>{{row.stock_name}}<br>{{row.close ? math_round(row.shares*row.close) : row.shares*1||'-'}}</td>
                                    <td>{{row.shares}}<br>{{row.shares}}</td>
                                    <td>{{row.close||'-'}}<br>{{row.cost}}</td>
                                    <td>{{math_round(cal_profit_and_lost(row.cost,row.close,row.shares))||'-'}}<br>{{persent_profit_and_lost(cal_profit_and_lost(row.cost,row.close,row.shares),row.cost*row.shares)}}</td>
                                </tr>
                                <!-- <tr>
                                    <td>长江电力<br>34444</td>
                                    <td>2100<br>21000</td>
                                    <td>16.66<br>14.47</td>
                                    <td>4596<br>15.11%</td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div class="table-foot">共持有{{this.concat_new_stock.length}}个证券</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StockAccountNav from '../components/StockAccountNav';
import http from '../util/http';
import helper from '../util/helper';

export default {
    components:{StockAccountNav},
    data() {
        return {
            perAccountStock:[], //单账户股票列表
            perAccountInfo:{}, //子组件回调账户信息
            concat_new_stock:[], //合并最新数据股票数据的列表
            stock_code_list:[], //股票代码列表
            real :{}, // 股票实时数据
            cash_info:{} //单独存现金数据，方便调用
        }
    },
    methods: {
        // 四舍五入计算
        math_round(num) {
        return helper.math_round(num);
        },
        // 计算盈亏
        cal_profit_and_lost(a,b,c){
            // a 代表成本，b现价，c股数
            return (b - a)*c
        },
        // 计算盈亏比例
        persent_profit_and_lost(a,b){
            return helper.toPercent(a / b)
        },
        getPerAccount(row){
            this.perAccountInfo = row; //子组件将当前账户信息传入
            
            // ins的loading组件开始
            this.$insProgress.start();
            
            // 将属于该账户下所有股票信息从trade获取回来
            http.post('trade/read',{
                where:{
                    account_belong_id:row.id,
                    account_id:row.account_id,
                }
            }).then(r=>{
                this.perAccountStock = r.data; //获取当前账户的股票持仓
            }).then(r=>{
                // 获取股票代码数组
                this.get_code_list();
            }).then(r=>{
                // 去掉现金代码
                let index = this.stock_code_list.indexOf('999999');
                let query_code_lit = this.stock_code_list;
                if ( index != -1 ){
                    query_code_lit.splice(index,1);
                }
                // 获取股票的最新数据
                http.api(query_code_lit)
                    .then(r=>{
                        this.real = r;
                    }).then(r=>{
                        this.concat_stock_data();
                        this.$insProgress.finish();
                })
            })

        },
        //点击单个账户后，将原始的股票信息和最新获取的股价信息合并
        concat_stock_data(){
            let perAccountStock = this.perAccountStock,
                len = perAccountStock.length,
                real = this.real,
                real_len = real.length
                this.concat_new_stock = [] //清空一次;
            
            for (let i = 0; i < len;i++) {
                let code = perAccountStock[i].stock_code;
                console.log('code',code);
                if(code.startsWith('6')){
                    code = code + '.SH';
                } 
                else if(code.startsWith('0')||code.startsWith('3')){
                    code = code + '.SZ'
                }
                else {
                    // 处理现金数据
                    this.cash_info = perAccountStock[i];
                    let a = Object.assign(perAccountStock[i],{"close":1})
                    this.concat_new_stock.push(a)
                    continue
                }
                
                for (let t = 0; t < real_len;t++){
                    let index = real[t].ts_code.indexOf(code);
                    
                    if(index == 0){
                        let a = perAccountStock[i],
                            b = real[t];
                        this.concat_new_stock.push(Object.assign(a,b))
                    } 
                }
            }

        },
        //获取当前账户股票列表
        get_code_list(){
            let stock_list = this.perAccountStock
                ,len = stock_list.length
                , stock_code_list = this.stock_code_list = []
                ;

            for (let i = 0; i < len; i++) {
                let code = stock_list[i].stock_code;
                stock_code_list.push(code);
            }
            console.log('this.stock_code_list',this.stock_code_list);
            
        },

    },
    computed: {
        // 计算总市值
        total_value: function() {
            let result = helper.sum_arr_by_props(this.concat_new_stock, "close", "shares");
            return helper.math_round(result);
            // console.log('helper.math_round(result',helper.math_round(result));
      
        },
        // 计算总成本
        total_cost_value: function(){
            let result = helper.sum_arr_by_props(this.concat_new_stock, "cost", "shares");
            return helper.math_round(result);
        },
        // 计算可用现金
        total_cash_value: function(){
            // this.perAccountStock[]
        },
    },
}
</script>
<style scoped>
.font-bold{
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9)
}
.card {
   border: 1px solid rgba(0, 0, 0, 0.2); 
}
.card .title {
    font-size: 1.2rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2); 
    padding: 5px 0px;
    text-align: center;
}
.table-foot {
    padding: 8px 0px;
    text-align: center;
    color: rgba(0, 0, 0, 0.3)
}
.card .board {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2)
}
.card .board > *{
    text-align: center;
}
.card .board .row >*{
    padding: 8px 0px;
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.2)
}
</style>