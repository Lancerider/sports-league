<template>
  <div class="app">
    <NavBar />
    <div class="main-container">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
  import LeagueService from './services/LeagueService';
  import NavBar from './components/NavBar.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'App',
    components: {
      NavBar,
      Footer,
    },
    data() {
      return {
        leagueService: null,
      }
    },
    async created() {
      const leagueService = new LeagueService();

      await leagueService.fetchData();

      this.leagueService = leagueService;
    },
    provide() {
      return {
        leagueService: () => this.leagueService,
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "./index.css";

.app {
  min-height: 100vh;
  flex-direction: column;

  .main-container {
    min-height: calc(100vh - 100px);
  }
}

</style>
