<template>
  <el-container>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.person" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="票号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="货品名称" :label-width="formLabelWidth">
          <el-input v-model="form.product" autocomplete="off" />
        </el-form-item>
        <el-form-item label="应收发票金额" :label-width="formLabelWidth">
          <el-input v-model="form.should" autocomplete="off" />
        </el-form-item>
        <el-form-item label="已收发票金额" :label-width="formLabelWidth">
          <el-input v-model="form.completed" autocomplete="off" />
        </el-form-item>
        <el-form-item label="已冲抵发票金额" :label-width="formLabelWidth">
          <el-input v-model="form.deduction" autocomplete="off" />
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
        placeholder="请输入搜索内容"
        clearable
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
        prop="number"
        label="票号"
        width="200"
      />
      <el-table-column
        prop="product"
        label="货品名称"
        width="200"
      />
      <el-table-column
        prop="quantity"
        label="数量"
      />
      <el-table-column
        prop="unit"
        label="单位"
      />
      <el-table-column
        prop="should"
        label="应收发票金额"
      />
      <el-table-column
        prop="completed"
        label="已收发票金额"
      />
      <el-table-column
        prop="nodone"
        label="未收发票金额"
      />
      <el-table-column
        prop="deduction"
        label="已冲抵发票金额"
      />
      <el-table-column
        prop="person"
        label="联系人"
      />
      <el-table-column
        prop="name"
        label="经办人"
        width="80"
      />
      <el-table-column
        prop="remarks"
        label="备注"
        width="200"
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
      },
      {
        value: 'number',
        label: '票号'
      },
      {
        value: 'porduct',
        label: '货品名称'
      }, {
        value: 'person',
        label: '联系人'
      }, {
        value: 'name',
        label: '经办人'
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
        date: '',
        number: '',
        product: '',
        quantity: '',
        unit: '',
        should: '',
        completed: '',
        nodone: '',
        deduction: '',
        person: '',
        name: '',
        remarks: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      tableData: []
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
        date: '',
        number: '',
        product: '',
        quantity: '',
        unit: '',
        should: '',
        completed: '',
        nodone: '',
        deduction: '',
        person: '',
        name: '',
        remarks: ''
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
        const tHeader = ['日期', '经办人', '已冲抵发票金额', '货品名称', '应收发票金额', '已收发票金额', '未收发票金额', '票号', '数量', '单位', '联系人', '备注']
        const filterVal = ['date', 'name', 'deduction', 'product', 'should', 'completed', 'nodone', 'number', 'quantity', 'unit', 'person', 'remarks']
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
