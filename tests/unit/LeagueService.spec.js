import LeagueService from "../../src/services/LeagueService";


describe('service/LeagueService', () => {

  test('Example #1 - Tiebreaker by head-to-head points with 2 teams.', () => {
    const leagueService = new LeagueService();

    leagueService.setMatches([
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 1, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Stadion Rajko Mitic", "homeTeam": "Serbia",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 1, "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Switzerland", "matchPlayed": true, "homeTeamScore": 2, "awayTeamScore": 3
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Cameroon", "matchPlayed": false, "homeTeamScore": null, "awayTeamScore": null
       }
    ]);

    const expected = [
      {
          "teamName": "Brazil", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 3, "points": 4
      },
      {
          "teamName": "Serbia", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 2, "points": 4
      },
      {
          "teamName": "Switzerland", "matchesPlayed": 2, "goalsFor": 3,
          "goalsAgainst": 4, "points": 3
      },
      {
          "teamName": "Cameroon", "matchesPlayed": 2, "goalsFor": 1,
          "goalsAgainst": 1, "points": 2
      }
    ];

    expect(leagueService.getLeaderboard()).toStrictEqual(expected);
  });

  test('Example #2 - Tiebreaker by head-to-head points with 3 teams.', () => {
    const leagueService = new LeagueService();

    leagueService.setMatches([
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Stadion Rajko Mitic", "homeTeam": "Serbia",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 1, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Switzerland", "matchPlayed": true, "homeTeamScore": 4, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Cameroon", "matchPlayed": false, "homeTeamScore": null, "awayTeamScore": null
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 2, "awayTeamScore": 2
       }
    ]);

    const expected = [
      {
          "teamName": "Cameroon", "matchesPlayed": 2, "goalsFor": 4,
          "goalsAgainst": 3, "points": 4
      },
      {
          "teamName": "Brazil", "matchesPlayed": 2, "goalsFor": 4,
          "goalsAgainst": 2, "points": 4
      },
      {
          "teamName": "Serbia", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 2, "points": 4
      },
      {
          "teamName": "Switzerland", "matchesPlayed": 3, "goalsFor": 4,
          "goalsAgainst": 8, "points": 1
      }
    ];

    expect(leagueService.getLeaderboard()).toStrictEqual(expected);
  });

  test('Example #3 - Tiebreaker by goal difference.', () => {
    const leagueService = new LeagueService();

    leagueService.setMatches([
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Stadion Rajko Mitic", "homeTeam": "Serbia",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 1, "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Switzerland", "matchPlayed": true, "homeTeamScore": 3, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Cameroon", "matchPlayed": false, "homeTeamScore": null, "awayTeamScore": null
       }
    ]);

    const expected = [
      {
          "teamName": "Serbia", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 1, "points": 5
      },
      {
          "teamName": "Brazil", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 2, "points": 5
      },
      {
          "teamName": "Cameroon", "matchesPlayed": 2, "goalsFor": 1,
          "goalsAgainst": 1, "points": 2
      },
      {
          "teamName": "Switzerland", "matchesPlayed": 2, "goalsFor": 2,
          "goalsAgainst": 5, "points": 0
      }
    ];

    expect(leagueService.getLeaderboard()).toStrictEqual(expected);
  });

  test('Example #4 - Tiebreaker by the number of scored goals', () => {
    const leagueService = new LeagueService();

    leagueService.setMatches([
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Serbia", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Stadion Rajko Mitic", "homeTeam": "Serbia",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 1, "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Switzerland", "matchPlayed": true, "homeTeamScore": 4, "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685, "stadium": "Maracanã", "homeTeam": "Brazil",
        "awayTeam": "Cameroon", "matchPlayed": true, "homeTeamScore": 0, "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685, "stadium": "Stade de Suisse", "homeTeam": "Switzerland",
        "awayTeam": "Cameroon", "matchPlayed": false, "homeTeamScore": null, "awayTeamScore": null
       }
    ]);

    const expected = [
      {
          "teamName": "Brazil", "matchesPlayed": 3, "goalsFor": 4,
          "goalsAgainst": 2, "points": 5
      },
      {
          "teamName": "Serbia", "matchesPlayed": 3, "goalsFor": 3,
          "goalsAgainst": 1, "points": 5
      },
      {
          "teamName": "Cameroon", "matchesPlayed": 2, "goalsFor": 1,
          "goalsAgainst": 1, "points": 2
      },
      {
          "teamName": "Switzerland", "matchesPlayed": 2, "goalsFor": 2,
          "goalsAgainst": 6, "points": 0
      }
    ];

    expect(leagueService.getLeaderboard()).toStrictEqual(expected);
  });

})
