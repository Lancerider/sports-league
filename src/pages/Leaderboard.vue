<template>
  <div class="page-container">
    <div class="leaderboard">
      <div class="leaderboard-title">League Standings</div>
      <div class="leaderboard-header">
        <div class="country">
          <div class="header-title">Team Name</div>
        </div>
        <div class="scores">
          <div class="header-title">MP</div>
          <div class="header-title goals">GF</div>
          <div class="header-title goals">GA</div>
          <div class="header-title goals-difference">GD</div>
          <div class="header-points points">Points</div>
        </div>
      </div>
      <div
        v-for="(team, index) in leaderboard"
        :key="index"
        class="leaderboard-row"
      >
        <div class="country">
          <Flag :country="team.teamName"/>
          <div class="team-name">{{ team.teamName }}</div>
        </div>
        <div class="scores">
          <div class="team-score">{{ team.matchesPlayed }}</div>
          <div class="team-score goals">{{ team.goalsFor }}</div>
          <div class="team-score goals">{{ team.goalsAgainst }}</div>
          <div class="team-score goals-difference">
            {{ team.goalsFor - team.goalsAgainst }}
          </div>
          <div class="team-points">{{ team.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/Flag';

export default {
  name: 'Leaderboard',
  components: { Flag },
  inject: {
    leagueService: {
      from: 'leagueService',
      default: () => {},
    }
  },
  computed: {
    leaderboard() {
      return this.leagueService() ? this.leagueService().getLeaderboard() : [];
    },
  },
}
</script>

<style lang="scss" scoped>

.leaderboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #4B5C68;

  .leaderboard-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
  }

  .leaderboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E4EDF2;
    padding: 10px;
    font-size: 12px;
    font-weight: 700;
    min-height: 20px;
  }

  .country {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 12px;
  }

  .scores {
    display: flex;
    text-align: center;

    .header-title,
    .team-score {
      width: 100px;
    }

    .header-points,
    .team-points {
      width: 120px;
    }
  }

  .leaderboard-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 70px;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px #E4EDF2;

    .team-name {
      font-size: 16px;
      font-weight: 700;
    }

    .team-points {
      font-size: 16px;
      font-weight: 700;
      color: #025FEB;
    }
  }

  .goals-difference {
    display: none;
  }

  @media (max-width: 680px) {
    .goals {
      display: none;
    }

    .goals-difference {
      display: flex;
      justify-content: center;
    }

    .scores {
      .header-title,
      .team-score {
        width: 60px;
      }

      .header-points,
      .team-points {
        width: 60px;
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 460px) {
    .leaderboard-row .team-name {
      font-size: 12px;
      text-transform: uppercase;
    }
  }
}
</style>
