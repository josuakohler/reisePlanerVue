<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close" @click="TogglePopup()">Close Popup</button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["TogglePopup"],
};
</script>

<style lang="scss" scoped>
.popup {
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-inner {
  background-color: #1db954; /* Spotify Green */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #fff;
  max-width: 400px;
  padding: 20px;
  position: relative;
  text-align: center;
}

.popup-close {
  background-color: #191414; /* Spotify Dark Background */
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.popup-close:hover {
  background-color: #1db954; /* Hover effect with Spotify Green */
  color: #191414; /* Text color change to Spotify Dark Background */
}

</style>
