<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div
    class="pt-8 text-center h-screen bg-[image:linear-gradient(to_bottom,theme(colors.blue.200)_90%,theme(colors.red.200))]"
  >
    <RouterView />
  </div>
</template>
