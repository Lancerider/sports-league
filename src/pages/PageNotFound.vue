<template>
  <div class="not-found-container">
    <img src="@/assets/images/404.png" alt="Page Not Found" class="error-image" />
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
}
</script>

<style lang="scss" scoped>

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 5% 20px 5%;
}

</style>
