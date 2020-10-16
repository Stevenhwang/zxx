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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-header>
      <el-input
        v-model="input"
        style="width:350px;"
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
    <el-main><el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="150"
      />
      <el-table-column
        prop="name"
        label="材料类别"
        width="400px"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
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
export default {
  data() {
    return {
      form: {
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      input: '',
      tableData: [{
        name: '木头'
      }, {
        name: '金属'
      }]
    }
  },

  methods: {
    handleFilter() {},
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
    }
  }
}
</script>
