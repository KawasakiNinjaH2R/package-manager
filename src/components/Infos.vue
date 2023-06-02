<template>
  <div class="infos">
    <h2>Infos:</h2>
    <p><LicenseIcon :size="24" /> {{ license }}</p>
    <p>
      <WebsiteIcon :size="24" />
      <a :src="website"> Website </a>
    </p>
    <p><DocumentIcon :size="24" /> <a :src="document"> Documentation </a></p>
  </div>
</template>

<script setup lang="ts">
import LicenseIcon from "~/assets/LicenseIcon.vue";
import WebsiteIcon from "~/assets/websiteIcon.vue";
import DocumentIcon from "~/assets/DocumentIcon.vue";
const { license, website, document } = defineProps({
  license: String,
  website: String,
  document: String,
});
</script>

<style lang="scss">
.infos{
    text-align: left;
}
p {
  font: 1em sans-serif;
  text-decoration: none;
  >a{
    color: blue !important;
  }
}
</style>
