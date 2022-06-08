/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 */
class LeagueService {
  matches = [];

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    const setMatch = match => this.matches.push(match);

    // For vue reactivity
    matches.forEach(setMatch.bind(this))
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const basicLeaderboard = this.getBasicLeaderboard(this.matches);

    const areTeamsTied = this.checkTeamsPoints(basicLeaderboard);

    if (!areTeamsTied) {
      return basicLeaderboard;
    }

    const leaderboard = this.leadershipPositions(basicLeaderboard);

    return leaderboard;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objects without Tie Breaking.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @param {Array} matches List of matches.
   * @returns {Array} List of teams arranged by points.
   */
  getBasicLeaderboard(matches = this.matches) {
    const teamsData = {};

    matches.forEach(match => {
      const isHomeTeamAdded = teamsData[match.homeTeam];
      const isAwayTeamAdded = teamsData[match.awayTeam];
      const {
        homeTeam,
        awayTeam,
        homeTeamScore,
        awayTeamScore
      } = match;

      const baseTeamData = {
        matchesPlayed: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };

      if (!isHomeTeamAdded) {
        teamsData[match.homeTeam] = {
          teamName: match.homeTeam,
          ...baseTeamData
        };
      }

      if (!isAwayTeamAdded) {
        teamsData[match.awayTeam] = {
          teamName: match.awayTeam,
          ...baseTeamData
        };
      }

      teamsData[homeTeam].matchesPlayed += match.matchPlayed ? 1 : 0;
      teamsData[homeTeam].goalsFor += match.matchPlayed ? homeTeamScore : 0;
      teamsData[homeTeam].goalsAgainst += match.matchPlayed ? awayTeamScore : 0;
      teamsData[homeTeam].points += match.matchPlayed ? this.calculateMatchPoints(homeTeamScore, awayTeamScore) : 0;

      teamsData[awayTeam].matchesPlayed += match.matchPlayed ? 1 : 0;
      teamsData[awayTeam].goalsFor += match.matchPlayed ? awayTeamScore : 0;
      teamsData[awayTeam].goalsAgainst += match.matchPlayed ? homeTeamScore : 0;
      teamsData[awayTeam].points += match.matchPlayed ? this.calculateMatchPoints(awayTeamScore, homeTeamScore) : 0;
    })

    const basicLeaderboard = Object.values(teamsData)
      .sort((a, b) => b.points - a.points);

    return basicLeaderboard;
  }

  /**
   * Calculates the points for a team based on the match results:
   * @param {INTEGER} currentTeamPoints
   * @param {INTEGER} opposingTeamPoints
   * @returns {INTEGER} Points earned.
   */
  calculateMatchPoints(currentTeamPoints, opposingTeamPoints) {
    if (currentTeamPoints > opposingTeamPoints) {
      return 3;
    }

    if (currentTeamPoints === opposingTeamPoints) {
      return 1;
    }

    return 0
  }

  /**
   * Checks if there if there are teams tied:
   * @param {Array} leadershipList List of teams with points earned
   * @returns {INTEGER} Points earned.
   */
  checkTeamsPoints(leadershipList) {
    const points = Array.from(new Set(leadershipList.map(team => team.points)));

    const thereAreTeamsWithTied = points.length !== leadershipList.length;

    return thereAreTeamsWithTied;
  }

  /**
   * Defines the order of winners, taking in count the Tiebreakes:
   * @param {Array} teamsData List of teams with their leaderboard points
   */
  leadershipPositions(teamsData) {
    const points = Array.from(new Set(teamsData.map(team => team.points))); // [3, 3, 2, 1]

    const leaderboard = points.reduce((newLeaderboard, point) => {
      const teamFilteredByPoints = teamsData.filter(team => team.points === point)

      if (teamFilteredByPoints.length === 1) {
        return [...newLeaderboard, teamFilteredByPoints[0]]
      }

      // FIRST TIE BREAKER
      const sameScoreTeamsNames = teamFilteredByPoints.map(team => team.teamName)

      const matchesFiltered = this.matches.filter(match => {
          return sameScoreTeamsNames.includes(match.awayTeam)
            & sameScoreTeamsNames.includes(match.homeTeam)
        });

      const subLeaderboard = this.getBasicLeaderboard(matchesFiltered);

      const teamsTied = this.checkTeamsPoints(subLeaderboard);

      const realSubTeamData = subLeaderboard.map(subteam => {
        return teamsData.find(team => team.teamName === subteam.teamName)
      })

      if (!teamsTied) {
        return [...newLeaderboard, ...realSubTeamData]
      }

      const subLeaderboardFiltered = subLeaderboard.sort((teamA, teamB) => {
        if (teamA.points !== teamB.points) {
          return teamB.points - teamA.points;
        }

        const realTeamA = realSubTeamData.find(team => team.teamName === teamA.teamName)
        const realTeamB = realSubTeamData.find(team => team.teamName === teamB.teamName)

        // SECOND TIE BREAKER - Goal Difference
        const goalsDifferenceA = realTeamA.goalsFor - realTeamA.goalsAgainst;
        const goalsDifferenceB = realTeamB.goalsFor - realTeamB.goalsAgainst;

        if (goalsDifferenceA !== goalsDifferenceB) {
          return goalsDifferenceB - goalsDifferenceA;
        }

        // THIRD TIE BREAKER - Scored Goals
        if (realTeamA.goalsFor !== realTeamB.goalsFor) {
          return realTeamB.goalsFor - realTeamA.goalsFor;
        }

        // FOURTH TIE BREAKER - Alphabetical Order
        return teamA.teamName.localeCompare(realTeamB.teamName)
      })

      const subLeaderboardFilteredRealData = subLeaderboardFiltered.map(subteam => {
        return teamsData.find(team => team.teamName === subteam.teamName)
      })

      return [...newLeaderboard, ...subLeaderboardFilteredRealData]
    }, [])

    return leaderboard
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    try {
      const apiCallOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const response = await fetch(
        `${process.env.VUE_APP_API_URL}/getAllMatches`,
        apiCallOptions
      );
      const data = await response.json();

      this.setMatches(data.matches);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Asynchronic function to get Token the data from the server.
   */
  async getAccessToken() {
    try {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/getAccessToken`);
      const data = await response.json();

      localStorage.setItem("token", data.access_token);
    } catch (error) {
      console.log('Error getting Access Token');
    }
  }
}

export default LeagueService;
