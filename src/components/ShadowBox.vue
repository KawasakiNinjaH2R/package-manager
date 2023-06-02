<template>
    <div class="shadowbox">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.shadowbox{
    width: 93%;
    height: auto;
    margin: 24px;
    margin-top: 30px;
    line-height: 3;
    border-radius: 6px;
    background-color: #fff;
    transition: box-shadow 0.5s,transform 0.5s;
    --shadow-color: 150deg 0% 50%;
    font-size: large;
    box-shadow: 
        0.5px 1px 1px hsl(var(--shadow-color )/ 0.7);
    
}
.shadowbox:hover{
    transform: scale(1.15);
    box-shadow: 
    1px 2px 2px hsl(var(--shadow-color )/ 0.2),
    2px 4px 4px hsl(var(--shadow-color )/ 0.2),
    4px 8px 8px hsl(var(--shadow-color )/ 0.2),
    8px 16px 16px hsl(var(--shadow-color )/ 0.2),
    16px 32px 32px hsl(var(--shadow-color )/ 0.2);
}
.shadowbox:active{
// --shadow-color: 0deg 0% 50%;
transform: scale(1.05);
    box-shadow: 
    1px 2px 2px hsl(var(--shadow-color )/ 0.333),
    2px 4px 4px hsl(var(--shadow-color )/ 0.333),
    3px 6px 6px hsl(var(--shadow-color )/ 0.333);
}
</style>