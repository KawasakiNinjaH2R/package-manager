<template>
  <div class="card" id="card">
    <h1>{{ title }}</h1>
    <p>{{ version }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";

type HoverCardProps = {
  title: string;
  version: string;
};
nextTick(() => {
  const card = document.getElementById("card");
  // Add an event listener for mouse move
  card.addEventListener("mousemove", (e) => {
    // Get the card width and height
    const width = card.offsetWidth;
    const height = card.offsetHeight;

    // Get the mouse position relative to the card center
    const x = e.offsetX - width / 2;
    const y = e.offsetY - height / 2;

    // Map the mouse position to a range of -10 to 10 degrees
    const positionX = (x / width) * 20 - 10;
    const positionY = (y / height) * 20 - 10;
    // Set the CSS custom properties for mouse position
    card.style.setProperty("--positionX", positionX.toString());
    card.style.setProperty("--positionY", positionY.toString());
  });
});

const { title, version } = defineProps<HoverCardProps>();
</script>

<style lang="scss">
.card {
  width: 93%;
  height: 200px;
  margin: 24px auto;
  padding: 12px;
  text-align: left;
  text-indent: 24px;
  transition: transform 0.5s, background 0.5s;
  transform-style: preserve-3d;
  background: rgba(158, 255, 148, 0.1);
  border-radius: 16px;
  --shadow-color: 150deg 0% 50%;
  box-shadow: 1px 2px 2px hsl(var(--shadow-color) / 0.2),
    2px 4px 4px hsl(var(--shadow-color) / 0.2), 4px 8px 8px hsl(var(--shadow-color) / 0.2),
    8px 16px 16px hsl(var(--shadow-color) / 0.2),
    16px 32px 32px hsl(var(--shadow-color) / 0.2);
  backdrop-filter: blur(3.2px);
  -webkit-backdrop-filter: blur(3.2px);
  border: 1px solid rgba(158, 255, 148, 0.3);
}

.card:hover {
  /* Use CSS custom properties to get mouse position */
  transform: rotateX(calc(var(--positionY) * -1deg))
    rotateY(calc(var(--positionX) * 1deg));
}
</style>
