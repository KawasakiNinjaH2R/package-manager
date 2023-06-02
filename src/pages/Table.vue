<template>
  <div class="container">
    <HoverCard title="VCPKGX" version="A vcpkg explorer" class="hover-card">
      <el-input
        v-model="input"
        class="input"
        size="large"
        placeholder="Please Input"
        :prefix-icon="Search"
    />
    </HoverCard>
    <el-table
      ref="tableRef"
      row-key="date"
      :data="tableData"
      style="
        min-width: 720;
        width: 100%;
        font-size: 1rem;
        padding: 24px;
        border-radius: 16px;
      "
      :cell-click="goto"
    >
      <el-table-column
        prop="name"
        label="Name"
        min-width="180"
        column-key="name"
      />
      <el-table-column
        prop="description"
        label="Description"
        min-width="530"
        show-overflow-tooltip="true"
      />
      <el-table-column
        prop="version"
        label="Version"
        :formatter="formatter"
        min-width="90"
      />
      <el-table-column
        prop="license"
        label="License"
        min-width="150"
      />
      <!-- <template #default="scope">
            <el-tag
                :type="scope.row.tag === 'Home' ? '' : 'success'"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
            >
            </template>
        </el-table-column> -->
      <el-table-column min-width="100">
        <template #default="scope">
          <!-- <More style="width: 3rem; height: 3rem; margin-right: 8px" /> -->
          <router-link :to="'/detail/' + scope.row.name">
            <el-icon :size="20" class="no-inherit">
              <More style="width: 2rem; height: 2rem; margin-right: 8px;color:#cf8ad9" />
            </el-icon>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { More } from "@element-plus/icons-vue";
  import type { TableColumnCtx, TableInstance } from "element-plus";
  import { Search } from "@element-plus/icons-vue";

  import packageData from "../assets/date.json";

  interface User {
    date: string;
    name: string;
    address: string;
    tag: string;
  }

  const goto = (a, b, c, e) => {
    console.log("a", a);
    console.log("b", b);
    console.log("c", c);
    console.log("e", e);
  };

  const tableRef = ref<TableInstance>();
  const formatter = (row, column: TableColumnCtx<User>) => {
    return row.version;
  };

  const input = ref("");
  // const tableData = computed(() => {
  //     const result =  packageData.filter((item) => item.name.includes(input.value));
  //     return result
    
  // });
  let result:any
  let tableData = computed({
    get(){
      result =  packageData.filter((item) => item.name.includes(input.value));
      return result
    },
    set(newValue) {
      tableData.value = newValue;        
    }
  })

  console.log('%c [ result ]-94', 'font-size:13px; background:#bdc0d2; color:#ffffff;', tableData.value)

  let pageSize = 10
  let currentPage = 1
  const totalItems = packageData.length
  console.log(pageSize)
  // 分页大小改变时的回调
  const handleSizeChange = (size) =>{
      pageSize = size;
      console.log(pageSize)
      loadData();
  }
  // 页码改变时的回调
  const handleCurrentChange = (page) => {
      currentPage = page;
      console.log(currentPage)
      loadData();
  }
  const loadData = () =>{
      // 根据 currentPage 和 pageSize 获取对应的数据
      const re = packageData.slice((currentPage-1)*10, ((currentPage-1)*10)+pageSize)
      // // 更新 tableData 和 totalItems
      tableData.value = re

      console.log(typeof re)
      console.log(typeof tableData)
      console.log(2222222222222222)
      console.log(re)
  }

</script>
<style lang="scss">
  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
    width: auto;

    @media screen and (min-width: 1024px) {
      max-width: 960px;
    }

    @media screen and (min-width: 1216px) {
      max-width: 1152px;
    }

    @media screen and (min-width: 1408px) {
      max-width: 1344px;
    }
  }
  .input {
    width: 50%;
    background-color: rgba(158, 255, 148, 0.1) !important;
    .ep-input {
      --ep-input-bg-color: rgba(158, 255, 148, 0.1) !important;
    }
  }
  .hover-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
