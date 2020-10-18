<template>
  <el-container>
    <el-dialog title="新增类别" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="材料类别" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
      </div>
    </el-dialog>
    <el-header>
      <el-input
        v-model="listQuery.search"
        style="width:400px;"
        clearable
        placeholder="请输入搜索内容"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate()"
      >新增类别
      </el-button>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="name"
          label="材料类别"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
        />
        <el-table-column
          prop="updatedAt"
          label="更新时间"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="{row,$index}">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleUpdate(row)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="handleDelete(row,$index)" />
          </template>
        </el-table-column>
      </el-table></el-main>
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
import { getMaterialTypes, deleteMaterialType } from '@/api/material'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      },
      form: {
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      tableData: []
    }
  },

  created() {
    this.getList()
  },

  methods: {
    transDate(listData) {
      const result = []
      listData.forEach(data => {
        data.createdAt = parseTime(new Date(data.createdAt))
        data.updatedAt = parseTime(new Date(data.updatedAt))
        result.push(data)
      })
      return result
    },
    getList() {
      this.listLoading = true
      getMaterialTypes(this.listQuery).then(response => {
        this.tableData = this.transDate(JSON.parse(response.data))
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    modify() {
      this.$message({
        message: '提交成功',
        type: 'success'
      })
      this.dialogFormVisible = false
    },
    handleFilter() {
      this.listLoading = true
      getMaterialTypes(this.listQuery).then(response => {
        this.tableData = this.transDate(JSON.parse(response.data))
        this.total = response.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetForm() {
      this.form = {
        name: '' }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = '新增类别'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.form.timestamp = new Date(this.form.date)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMaterialType(row.id).then(response => {
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
    }
  }
}
</script>
