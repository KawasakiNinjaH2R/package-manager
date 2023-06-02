<template>
<!-- <el-tag 
v-for="item in items" 
:type="type"
:class="class"
:effect="effect"
:round="round">{{ item.content }} </el-tag> -->
<div>
    <slot v-for="item in list" name="tab" :data="item"></slot>
</div>
</template>

 <script setup lang="ts">
// type TagPropsType={
//     type?:'success'|'info'|'warning'|'danger',
//     items:{content:string|Element}[],
//     effect?:'dark'|'light'|'plain',
//     round?:boolean,
//     class?:string,
// }
// const {items,effect,round,type}=defineProps<TagPropsType>()
type ListType={
    list:{[key:PropertyKey]:unknown}[]
}
const {list}=defineProps<ListType>()
</script>