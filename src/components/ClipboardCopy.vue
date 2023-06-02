<template>
  <div style="width: 90%; margin: 24px">
    <div class="label-box">
      <span :class="['label', { active: isActiveWindows }]" @click="clickWindows">
        <WindowsIcon :size="24"/>
      </span>
      <span :class="['label', { active: isActiveLunix }]" @click="clickLunix">
        <MacOSIcon :size="24"/>
        <span style="margin-right: -8px; padding-top: 8px">
          <svg
            t="1682241545181"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8559"
            width="32"
            height="32"
          >
            <path
              d="M434.432 860.16L700.928 153.6h-75.264L358.4 860.16z"
              fill="currentcolor"
              opacity=".5"
              p-id="8560"
            ></path>
          </svg>
        </span>
        <LunixIcon :size="32"/>
      </span>
    </div>
    <div class="code-box">
      <button @click="copy" class="icon">
        <div v-if="copySuccessed">
          <el-icon><Select /></el-icon>
        </div>
        <div v-else>
          <el-icon>
            <CopyDocument />
          </el-icon>
        </div>
      </button>
      <p v-if="isActiveWindows">{{ codeWindows }}</p>
      <p v-if="isActiveLunix">{{ codeLunix }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useClipboard from "vue-clipboard3";
import { Select, CopyDocument } from "@element-plus/icons-vue";
import LunixIcon from "../assets/LunixIcon.vue";
import WindowsIcon from "../assets/WindowsIcon.vue";
import MacOSIcon from "../assets/MacOSIcon.vue";

const copySuccessed = ref(false);
const {name}= defineProps({
  name:String
})
const codeWindows = "vcpkg.exe install "+ name;
const codeLunix= "vcpkg install "+ name
const { toClipboard } = useClipboard();

const copy = async () => {
  try {
    await toClipboard(code);
    console.log("Copied to clipboard");
    copySuccessed.value = true;
    setTimeout(() => {
      copySuccessed.value = false;
    }, 1000);
  } catch (e) {
    console.error(e);
  }
};

const isActiveWindows = ref(true);
const isActiveLunix = computed(() => !isActiveWindows.value);
const clickWindows = () => {
  isActiveWindows.value = true;
};
const clickLunix = () => {
  isActiveWindows.value = false;
};
</script>
<style lang="scss">
.label-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #efefef;
  padding-right: 40px;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 8px 16px -2px,
    rgba(10, 10, 10, 0.02) 0px 0px 0px 1px;
  border-radius: 6px;
  line-height: 1.5;
}

.label {
  display: flex;
  width: auto;
  padding: 0.5em 1em;
  align-content: center;
  align-items: center;
  background: #e5e5e5;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #7f7f7f;
  transition: background 0.1s, color 0.1s;
  border-radius: 6px 6px 0px 0px;
}
.label:hover {
  background: hsl(0, 0%, 96%);
}

.active {
  background-color: #fff;
  color: hsl(217, 71%, 53%);
}

.code-box {
  order: 99;
  width: 100%;
  display: block;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
  position: relative;
  padding: 20px 20px 20px;
  color: hsl(0, 0%, 96%);
  background: hsl(0, 0%, 21%);
  border-radius: 0px 0px 6px 6px;

  button {
    top: 5px !important;
    right: 5px !important;
    z-index: 3 !important;
    position: absolute !important;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }

  p {
    margin: 0;
    padding: 0;
    text-align: left;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
</style>
