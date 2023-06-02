<template>
  <div class="container">
    <HoverCard :version="data.version" :title="data.name" class="hover-card"/>
      <div class="four-fifths-column">
        <ShadowBox style="text-align: left; text-indent: 2em;padding:12px">{{data.description}}</ShadowBox>
        <ClipboardCopy :name="name" />
        <ShadowBox>
          <Collapse name="Features:">
            <div class="version-table">
              <el-table :data="listData" style="width: 90%">
                <el-table-column prop="name" min-width="180" />
                <el-table-column prop="desricption" min-width="530" />
              </el-table>
            </div>
          </Collapse>
        </ShadowBox>
        <ShadowBox>
          <Collapse name="Build-Depends:">
            <TabsList :list="buildDepends" v-slot:tab="{ data }">
              <el-tag type="info" effect="dark" round @on-click="reload">
                <router-link :to="data.link" >
                  {{ data.content }}
                </router-link>
              </el-tag>
            </TabsList>
          </Collapse>
        </ShadowBox>
        <ShadowBox>
          <Collapse name="Versions:">
            <div class="version-table">
              <el-table v-if="tableData" :data="tableData" style="width: 90%">
                <el-table-column
                  prop="version"
                  label="Version"
                  min-width="180"
                  column-key="version"
                />
                <el-table-column prop="gitTree" label="Git-Tree" min-width="530" />
                <el-table-column prop="portVersion" label="portVersion" min-width="180" />
              </el-table>
            </div>
          </Collapse>
        </ShadowBox>
      </div>
      <div class="one-fifth-column">
        <Infos :license="license" :website="website" :document="document" />
      </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import { computed, inject } from "vue";

  import packageData from "../assets/date.json";

  //reload
  const reload = inject('reload')

  //init Data
  const name = computed(()=>useRoute().params.name)
  const data = computed<PackageDetailType>(() =>{
    console.group('packDate')
    const result = packageData.find((item) => {
      console.log('%c [ item.name ]-70', 'font-size:13px; background:#787584; color:#bcb9c8;', item.name)
      return item.name == name.value
    })
    console.groupEnd()
    console.log('%c [ name.value ]-69', 'font-size:13px; background:#cbc242; color:#ffff86;', name.value)
    console.log('%c [ result ]-69', 'font-size:13px; background:#cf8ad9; color:#ffceff;', result)
    return result as unknown as PackageDetailType
  });

  //handle BuildDepends
  type DependencyTabListsType = { content: string; link: string }[];
  const buildDepends = computed<DependencyTabListsType>(() => {
    const tempList = data.value.dependencies;
    const resultList: DependencyTabListsType = tempList.map((item) => {
      if (typeof item == "string") {
        return { content: item, link: "/detail/" + item };
      } else {
        return { content: item.name, link: "/detail/" + item.name };
      }
    });
    resultList.push({content:'cppcms', link:'/detail/cppcms'})
    return resultList;
  });

  //handle Version Table
  const tableData = computed(() => {
    const tempList = data.value.versions;
    if (tempList.length < 1) return false;
    return tempList.map((item) => {
      if (item.version)
        return {
          version: item.version,
          gitTree: item.gitTree,
          portVersion: item.portVersion,
        };
      if (item.versionDate)
        return {
          version: item.versionDate,
          gitTree: item.gitTree,
          portVersion: item.portVersion,
        };
    });
  });

  //handle dependcies List
  const listData = computed(() => {
    const tempObject = data.value.features;
    const resultList = [];
    for (const key in tempObject) {
      resultList.push({
        name: key,
        desricption: tempObject[key].description,
      });
    }
    return resultList;
  });

  //handle Infos
  const license = computed(() => data.value.license);
  const website = computed(() => data.value.homepage);
  const document = computed(() => data.value.documentation ?? data.value.homepage);
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: auto;

    @media screen and (min-width: 1024px) {
      max-width: 960px !important;
    }

    @media screen and (min-width: 1216px) {
      max-width: 1152px !important;
    }

    @media screen and (min-width: 1408px) {
      max-width: 1344px !important;
    }
  }
  .four-fifths-column {
    width: 75%;
    display: inline-block;
    padding: 12px;
  }
  .one-fifth-column {
    width: 18%;
    display: inline-block;
    padding: 12px;
  }
  .ep-collapse-item__content {
    text-align: left;
    text-indent: 2em;
    span {
      text-indent: 0;
    }
  }
  a {
    color: #fff !important;
    text-decoration: none;
  }
  .hover-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
</style>
