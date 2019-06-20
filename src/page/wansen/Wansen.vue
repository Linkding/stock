<template>
    <div class="container">
        <div>
            <div class="search-bar">
                <div class="col-lg-8">                    
                    万森
                </div>
                <div class="col-lg-4 right" >
                    <div>
                        <span class="username">王老板</span>
                    </div>
                </div>
            </div>
            <div class="meau_bar">
                <div class="col-lg-2">
                    <div class="btn">配号查询</div>
                </div>
            </div>
            <table>
                <thead class="thead">
                    <tr>
                        <th>券商</th>
                        <th>账户</th>
                        <th>申购代码</th>
                        <th>申购股票</th>
                        <th>申购数量</th>
                        <th>配号日期</th>
                        <th>起始配号</th>
                        <th>申购状态</th>
                        <th>删除</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>东方财富</td>  
                      <td>123455666</td>  
                      <td>732327</td>  
                      <td>福蓉科技</td>  
                      <td>15000</td>  
                      <td>2019-05-22</td>  
                      <td>52856136</td>  
                      <td>配号正常</td>  
                      <td>XX</td>  
                      <td>AAA</td>  
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.search-bar{
    padding: 5px;
    border:1px solid rgba(0, 0, 0, 0.2);
}
.meau_bar {
    padding: 8px;
    border:1px solid rgba(0, 0, 0, 0.2);
    
}
.meau_bar .btn{
    padding: 5px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    border-radius: 5px;
    background: #A7AEB8;
    color: white;
}
table {
  font-size: 12px;
}

table thead {
  background: #E2D4C0;
}
</style>
