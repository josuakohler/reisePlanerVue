<template>
<!-- A modal dialog containing a form -->
<dialog id="favDialog">
  <form>
    <slot />
    <div>
      <button  class="popup-close" @click="TogglePopup()">Cancel</button>
      <button id="confirmBtn" value="default">Confirm</button>
    </div>
  </form>
</dialog>
<output></output>

</template>

<script setup lang="ts">
// import { ref } from "vue";

defineProps<{ 
    TogglePopup: Function

  
   }>()



</script>

<style lang="scss" scoped>

</style>
