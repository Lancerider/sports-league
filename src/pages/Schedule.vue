<template>
  <div class="">
    Schedule
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  inject: ['leagueService'],
  async mounted() {
    this.leagueService.getLeaderboard();
  },
}
</script>

<style lang="scss" scoped>

</style>
