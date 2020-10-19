<template>
  <el-container>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="供应单位" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="材料名称" :label-width="formLabelWidth">
          <el-select v-model="form.detail" clearable placeholder="请选择">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单据编号" :label-width="formLabelWidth">
          <el-input v-model="form.docnum" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off" />
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <div class="block">
            <span class="demonstration" />
            <el-date-picker
              v-model="form.date"
              align="right"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-header style="margin-top: 20px">
      <el-select v-model="value" clearable placeholder="请选择搜索内容" @change="handleChange(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-if="!isDate"
        v-model="input"
        style="width:350px;"
        clearable
        placeholder="请输入搜索内容"
      />
      <template v-if="isDate">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </template>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate()"
      >新增订单
      </el-button>
    </el-header>
    <el-main><el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="100"
      />
      <el-table-column
        prop="name"
        label="联系人"
        width="80"
      />
      <el-table-column
        prop="address"
        label="供应单位"
        width="200"
      />
      <el-table-column
        prop="deatil"
        label="材料名称"
        width="200"
      />
      <el-table-column
        prop="docnum"
        label="单据编号"
        width="200"
      />
      <el-table-column
        prop="price"
        label="单价"
        width="80"
      />
      <el-table-column
        prop="quantity"
        label="数量"
        width="80"
      />
      <el-table-column
        prop="unit"
        label="单位"
        width="80"
      />
      <el-table-column
        prop="amount"
        label="金额"
      />
      <el-table-column
        prop="remarks"
        label="备注"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleUpdate(row)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="handleDelete(row,$index)" />
        </template>
      </el-table-column>
    </el-table></el-main>
    <el-footer><el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    /></el-footer>
  </el-container>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      isDate: false,
      value1: '',
      options: [{
        value: 'date',
        label: '日期'
      }, {
        value: 'name',
        label: '联系人'
      }, {
        value: 'address',
        label: '供应单位'
      },
      {
        value: 'docnum',
        label: '单据编号'
      }, {
        value: 'deatil',
        label: '材料名称'
      }],
      value: '',
      downloadLoading: false,
      input: '',
      dialogStatus: '',
      textMap: {
        update: '更新信息',
        create: '新增信息'
      },
      form: {
        name: '',
        address: '',
        detail: '',
        amount: '',
        date: '',
        remarks: '',
        unit: '',
        quantity: '',
        price: '',
        docnum: ''

      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
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
  },

  methods: {
    handleChange(item) {
      if (item === 'date') {
        this.isDate = true
      } else {
        this.isDate = false
      }
    },
    handleFilter() {},
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetForm() {
      this.form = {
        name: '',
        address: '',
        detail: '',
        amount: '',
        date: '',
        remarks: '',
        unit: '',
        quantity: '',
        price: '',
        docnum: ''
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.form.timestamp = new Date(this.form.date)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '联系人', '供应单位', '单据编号', '材料名称', '单价', '数量', '单位', '金额', '备注']
        const filterVal = ['date', 'name', 'address', 'docnum', 'detail', 'price', 'quantity', 'unit', 'amount', 'remarks']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.tableData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
