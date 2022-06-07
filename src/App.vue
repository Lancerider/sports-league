<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import LeagueService from './services/LeagueService';

  export default {
    name: 'App',
    data() {
      return {
        leagueService: new LeagueService(),
      }
    },
    async mounted() {
      await this.leagueService.fetchData()
    },
    provide() {
      return {
        leagueService: this.leagueService,
      }
    },
  }
</script>

<style>
@import "./index.css";

.welcomeMessage {
  margin: 120px auto;
  width: 50%;
  text-align: left;
  font-size: 24px;
}
</style>
