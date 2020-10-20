<template>
  <el-container>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.project" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-select v-model="form.product" clearable placeholder="请选择">
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
        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" prop="quantity">
          <el-input v-model="form.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="送货司机" :label-width="formLabelWidth">
          <el-input v-model="form.driver" autocomplete="off" />
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
      <el-button type="primary" :loading="templateloadLoading" @click="templateDownload"><i class="el-icon-download" />模板</el-button>
      <el-button type="primary" :loading="uploadLoading"><i class="el-icon-upload el-icon--right" />上传</el-button>
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
          prop="name"
          label="联系人"
          width="80"
        />
        <el-table-column
          prop="project"
          label="项目名称"
          width="200"
        />
        <el-table-column
          prop="product"
          label="产品名称"
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
          prop="driver"
          label="送货司机"
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
import { getSales, deleteSale, createSale, updateSale } from '@/api/sales'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import { getProductTypes } from '@/api/product'
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
      selectList: [],
      total: 0,
      rules: {
        price: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }],
        quantity: [{ message: '请输入数字！', trigger: 'blur', validator: validateData }]
      },
      listQuery: {
        page: 1,
        limit: 20,
        searchKey: '',
        searchValue: ''
      },
      tHeader: ['日期', '联系人', '项目名称', '产品名称', '单据编号', '单价', '数量', '单位', '金额', '备注'],
      isDate: false,
      options: [{
        value: 'date',
        label: '日期'
      }, {
        value: 'name',
        label: '联系人'
      },
      {
        value: 'docnum',
        label: '单据编号'
      }, {
        value: 'project',
        label: '项目名称'
      }, {
        value: 'product',
        label: '产品名称'
      }, {
        value: 'driver',
        label: '送货司机'
      }
      ],
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
        name: '',
        project: '',
        quantity: '',
        price: '',
        driver: '',
        product: '',
        date: '',
        remarks: '',
        unit: '',
        docnum: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      tableData: []
    }
  },
  created() {
    this.getSelectList()
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
    getSelectList() {
      getProductTypes({ page: 1, limit: 100 }).then(response => {
        this.selectList = JSON.parse(response.data)
      })
    },
    getList() {
      this.listLoading = true
      getSales(this.listQuery).then(response => {
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
      getSales(this.listQuery).then(response => {
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
        deleteSale(row.id).then(response => {
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
        name: '',
        project: '',
        product: '',
        quantity: '',
        price: '',
        driver: '',
        date: '',
        remarks: '',
        unit: '',
        docnum: ''
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
          createSale(this.form).then(() => {
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
          updateSale(tempData.id, tempData).then(() => {
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
      const filterVal = ['date', 'name', 'project', 'product', 'docnum', 'price', 'quantity', 'unit', 'amount', 'remarks']
      const data = this.formatJson(filterVal)
      export_json_to_excel({
        header: this.tHeader,
        data,
        filename: 'table-list'
      })
      this.downloadLoading = false
    },
    templateDownload() {
      this.templateloadLoading = true
      const data = []
      export_json_to_excel({
        header: this.tHeader,
        data,
        filename: '原材料模板'
      })
      this.templateloadLoading = false
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
