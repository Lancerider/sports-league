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
    this.matches = matches;
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
    const teamsData = {};

    this.matches.forEach(match => {
      const isHomeTeamAdded = teamsData[match.homeTeam];
      const isAwayTeamAdded = teamsData[match.awayTeam];
      const { homeTeamScore, awayTeamScore } = match;

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

      teamsData[match.homeTeam].matchesPlayed += 1;
      teamsData[match.awayTeam].matchesPlayed += 1;
      teamsData[match.homeTeam].goalsFor += homeTeamScore;
      teamsData[match.awayTeam].goalsFor += awayTeamScore;
      teamsData[match.homeTeam].goalsAgainst += awayTeamScore;
      teamsData[match.awayTeam].goalsAgainst += homeTeamScore;
      teamsData[match.homeTeam].points += this.calculateMatchPoints(homeTeamScore, awayTeamScore);
      teamsData[match.awayTeam].points += this.calculateMatchPoints(awayTeamScore, homeTeamScore);
    })

    const leaderboard = Object.values(teamsData).sort((a, b) => {
      return b.points - a.points;
    });

    console.log(leaderboard);

    return leaderboard;
  }

  /**
   * Calculates the points for a team based on the match results:
   * @param {INTEGER} currentTeamPoints
   * @param {INTEGER} opposingTeamPoints
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
