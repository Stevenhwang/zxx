<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <panel-group
      :pay="pay"
      :change="change"
      :sales="sales"
      :returns="returns"
      :payment="payment"
      :respay="respay"
      :cancellation="cancellation"
      :entryticket="entryticket"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { getDashboard } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart
  },
  data() {
    return {
      rawData: {},
      lineChartData: {
        expectedData: {
          name: '',
          data: []
        },
        actualData: {
          name: '',
          data: []
        }
      },
      pay: 0,
      change: 0,
      sales: 0,
      returns: 0,
      payment: 0,
      respay: 0,
      cancellation: 0,
      entryticket: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.rawData[type]
    },
    getData() {
      getDashboard().then(response => {
        this.rawData = response.lineChartData
        this.lineChartData = this.rawData.newVisitis
        const panelData = response.panelData
        this.pay = panelData.purchases.pay
        this.change = panelData.purchases.change
        this.sales = panelData.shipment.sales
        this.returns = panelData.shipment.return
        this.payment = panelData.moneyflow.payment
        this.respay = panelData.moneyflow.respay
        this.cancellation = panelData.invoice.cancellation
        this.entryticket = panelData.invoice.entryticket
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
