<template>
    <el-collapse v-model="activeNames" @change="handleChange" style="height:100%;padding-left:24px">
        <el-collapse-item name="1">
            <template #title>
                <h3>{{ name }}</h3>
            </template>
           <slot></slot>
        </el-collapse-item>
    </el-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const {name}=defineProps({
    name:String,
})

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>