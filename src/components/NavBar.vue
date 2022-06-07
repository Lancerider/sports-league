<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
    </router-link>
    <div class="header-links">
      <div class="link">
        <i class="nav-icon schedule"></i>
        <router-link :to="{ name: 'Schedule' }" class="nav-title">
          Schedule
        </router-link>
      </div>
      <div class="link">
        <i class="nav-icon leaderboard"></i>
        <router-link :to="{ name: 'Leaderboard' }" class="nav-title">
          Leaderboard
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-gap: 20px;
  align-items: center;
  padding: 10px 40px;
  background-color: #025FEB;
  font-size: 16px;

  .logo {
    width: 110px;
    height: 40px;
    background-image: url('/Images/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.header-links {
  display: flex;
  grid-gap: 40px;

  .link {
    display: flex;
    align-items: center;
    cursor: pointer;


    .nav-title {
      margin-left: 4px;
      color: #fff;
      text-decoration: none;
    }
  }

  .nav-icon {
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    &.schedule {
      background-image: url('/Images/schedule.png');
    }

    &.leaderboard {
      background-image: url('/Images/leaderboard.png');
    }
  }
}

</style>
