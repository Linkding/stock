<template>
    <div>
        <div class="card">
            <div class="title">林晓彬</div>
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
                    <tbody>
                        <tr>
                            <td>长江电力<br>34444</td>
                            <td>2100<br>21000</td>
                            <td>16.66<br>14.47</td>
                            <td>4596<br>15.11%</td>
                        </tr>
                        <tr>
                            <td>长江电力<br>34444</td>
                            <td>2100<br>21000</td>
                            <td>16.66<br>14.47</td>
                            <td>4596<br>15.11%</td>
                        </tr>
                    </tbody>
                </table>
                <div class="table-foot">共持有2个证券</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.card {
   border: 1px solid rgba(0, 0, 0, 0.2); 
   width: 500px;
}
.card .title {
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2); 
    padding: 5px 0px;
    text-align: center;
}
.table-foot {
    padding: 8px 0px;
    text-align: center;
    color: rgba(0, 0, 0, 0.3)
}
</style>
