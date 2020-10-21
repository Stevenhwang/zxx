<template>
  <el-container>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.person" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.project" autocomplete="off" />
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.company" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" prop="quantity">
          <el-input v-model="form.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="票号" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="货品名称" :label-width="formLabelWidth">
          <el-input v-model="form.product" autocomplete="off" />
        </el-form-item>
        <el-form-item label="应开票金额" :label-width="formLabelWidth" prop="should">
          <el-input v-model="form.should" autocomplete="off" />
        </el-form-item>
        <el-form-item label="已开票金额" :label-width="formLabelWidth" prop="completed">
          <el-input v-model="form.completed" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off" />
        </el-form-item>
        <el-form-item label="付款日期" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
    <el-header style="margin-top: 20px">
      <el-select v-model="listQuery.searchKey" clearable placeholder="请选择搜索内容" @change="handleChange(listQuery.searchKey)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-if="!isDate"
        v-model="listQuery.searchValue"
        style="width:350px;"
        clearable
        placeholder="请输入搜索内容"
      />
      <template v-if="isDate">
        <el-date-picker
          v-model="listQuery.searchValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
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
    <el-main>
      <el-table
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
          prop="company"
          label="公司名称"
          width="200"
        />
        <el-table-column
          prop="project"
          label="项目名称"
          width="200"
        />
        <el-table-column
          prop="product"
          label="货品名称"
          width="200"
        />
        <el-table-column
          prop="price"
          label="单价"
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
          prop="amount"
          label="金额"
        />
        <el-table-column
          prop="should"
          label="应开票金额"
        />
        <el-table-column
          prop="completed"
          label="已开票金额"
        />
        <el-table-column
          prop="nodone"
          label="未开票金额"
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
      </el-table>
    </el-main>
    <el-footer>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-footer>
  </el-container>
</template>

<script>
import { getCancellations, deleteCancellation, createCancellation, updateCancellation } from '@/api/cancellation'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
  components: { Pagination },
  data() {
    const validateData = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('请输入数字！'))
      } else {
        callback()
      }
    }
    return {
      total: 0,
      rules: {
        price: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }],
        number: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }],
        quantity: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }],
        should: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }],
        completed: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }]
      },
      listQuery: {
        page: 1,
        limit: 20,
        searchKey: '',
        searchValue: ''
      },
      tHeader: ['日期', '经办人', '项目名称', '公司名称', '货品名称', '应开票金额', '已开票金额', '未开票金额', '票号', '单价', '数量', '单位', '金额', '联系人', '备注'],
      isDate: false,
      options: [{
        value: 'date',
        label: '日期'
      },
      {
        value: 'number',
        label: '票号'
      },
      {
        value: 'company',
        label: '公司名称'
      },
      {
        value: 'porject',
        label: '项目名称'
      }, {
        value: 'product',
        label: '货品名称'
      }, {
        value: 'person',
        label: '联系人'
      }, {
        value: 'name',
        label: '经办人'
      }],

      downloadLoading: false,
      templateloadLoading: false,
      uploadLoading: false,
      input: '',
      dialogStatus: '',
      textMap: {
        update: '更新信息',
        create: '新增信息'
      },
      form: {
        date: '',
        number: '',
        company: '',
        project: '',
        product: '',
        price: '',
        quantity: '',
        unit: '',
        should: '',
        completed: '',
        person: '',
        name: '',
        remarks: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      tableData: []
    }
  },
  created() {
    this.getList()
  },

  methods: {
    transDate(Data) {
      const result = []
      Data.forEach(data => {
        data.date = parseTime(new Date(data.date))
        result.push(data)
      })
      return result
    },
    getList() {
      this.listLoading = true
      getCancellations(this.listQuery).then(response => {
        this.tableData = this.transDate(JSON.parse(response.data))
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleChange(item) {
      if (item === 'date') {
        this.isDate = true
        this.listQuery.searchValue = ''
      } else {
        this.isDate = false
        this.listQuery.searchValue = ''
      }
    },
    handleFilter() {
      this.listLoading = true
      if (this.listQuery.searchKey === 'date') {
        this.listQuery.searchValue = this.listQuery.searchValue.join(',')
      }
      getCancellations(this.listQuery).then(response => {
        this.tableData = this.transDate(JSON.parse(response.data))
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCancellation(row.id).then(response => {
          this.getList()
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
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
        company: '',
        project: '',
        product: '',
        price: '',
        quantity: '',
        unit: '',
        should: '',
        completed: '',
        person: '',
        name: '',
        remarks: ''
      }
    },

    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    createData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          createCancellation(this.form).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }).catch()
        }
      })
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          updateCancellation(tempData.id, tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }).catch()
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      const filterVal = ['date', 'name', 'project', 'company', 'product', 'should', 'completed', 'nodone', 'number', 'price', 'quantity', 'unit', 'amount', 'person', 'remarks']
      const data = this.formatJson(filterVal)
      export_json_to_excel({
        header: this.tHeader,
        data,
        filename: 'table-list'
      })
      this.downloadLoading = false
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
