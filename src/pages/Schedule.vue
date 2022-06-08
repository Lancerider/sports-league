<template>
  <div class="page-container">
    <div class="schedule">
      <div class="schedule-title">League Schedule</div>
      <div class="schedule-header">
        <div class="details">
          <div class="header-title date-time">Date/Time</div>
          <div class="header-title stadium">Stadium</div>
        </div>
        <div class="countries">
          <div class="header-title country left">Home Team</div>
          <div class="header-title score"></div>
          <div class="header-title country right">Away Team</div>
        </div>
      </div>
      <div
        v-for="(team, index) in schedule"
        :key="index"
        class="schedule-row"
        :class="{ shadow: (index % 2 !== 0)}"
      >
        <div class="details">
          <div class="date-time">
            <div class="time">{{ getDate(team.matchDate) }}</div>
            <div class="time">{{ getTime(team.matchDate) }}</div>
          </div>
          <div class="stadium">
            {{ team.stadium }}
          </div>
        </div>
        <div class="countries">
          <div class="country left">
            <div class="bold">
              {{ team.homeTeam }}
            </div>
            <Flag :country="team.homeTeam"/>
          </div>
          <div class="score bold">
            {{ `${team.homeTeamScore} : ${team.awayTeamScore}` }}
          </div>
          <div class="country right">
            <Flag :country="team.awayTeam"/>
            <div class="bold">{{ team.awayTeam }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/Flag';
import { format } from 'date-fns';

export default {
  name: 'Schedule',
  components: { Flag },
  inject: {
    leagueService: {
      from: 'leagueService',
      default: () => {},
    }
  },
  mounted() {
    console.log(format(1651744228685, 'yyyy-MM-dd'))
  },
  data() {
    return {
      schedule: this.leagueService().getMatches(),
    };
  },
  methods: {
    getDate(unixDate) {
      return format(unixDate, 'd.M.yyyy')
    },
    getTime(unixDate) {
      return format(unixDate, 'HH:mm')
    },
  }
}
</script>

<style lang="scss" scoped>
.schedule {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #4B5C68;

  .schedule-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
  }

  .schedule-header {
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
    justify-content: flex-start;
    align-items: center;
    grid-gap: 12px;
    width: 200px;

    &.right {
      justify-content: flex-start;
    }

    &.left {
      justify-content: flex-end;
    }
  }

  .stadium {
    display: flex;
    text-align: center;
  }

  .score {
    width: 90px;
    display: flex;
    justify-content: center;
  }

  .date-time {
    display: flex;
    flex-direction: column;
    width: 70px;
    text-align: right;
    margin-right: 70px;
  }

  .stadium {
    min-width: 120px;
    width: 200px;
    max-width: 200px;
    text-align: left;
  }

  .countries {
    min-width: 400px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .schedule-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 70px;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px #F6F7F7;

    .bold {
      font-size: 16px;
      font-weight: 700;
    }

    &.shadow {
      background-color: #F6F7F7;
    }
  }

  @media (max-width: 850px) {
    .stadium {
      display: none;
    }
  }

  @media (max-width: 720px) {
    .date-time {
      display: none;
    }

    .countries {
      min-width: auto;
      width: 100%;

      .country {
        width: calc(50% - 50px);
      }

      .score {
        width: 60px;
      }
    }
  }
}

</style>
