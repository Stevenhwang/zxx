<template>
  <el-container>
    <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单详情" :label-width="formLabelWidth">
          <el-input v-model="form.date2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="付款金额" :label-width="formLabelWidth">
          <el-input v-model="form.date3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <div class="block">
            <span class="demonstration" />
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-form-item></el-form></el-dialog>
    <el-header>
      <el-button
        type="primary"
        round
        @click="dialogFormVisible = true"
      >新增付款订单
      </el-button>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="换货日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="换货地址"
        />
        <el-table-column
          prop="Detailed description"
          label="换货详情"
        />
        <el-table-column
          prop="Amount"
          label="付款金额"
        />
      </el-table>

      <template>
        <el-button type="primary" icon="el-icon-edit" size="mini" circle />
        <el-button type="danger" icon="el-icon-delete" size="mini" circle />
      </template>

    </el-main>
    <el-footer><el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    /></el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
