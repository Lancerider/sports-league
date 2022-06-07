<template>
  <footer class="footer">
    <div class="version">
      API Version 1.0
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 40px;
  background-color: #F6F7F7;
  font-size: 12px;

  .version {
    min-height: 20px;
    font-weight: bold;
    color: #4B5C68;
  }
}


</style>
