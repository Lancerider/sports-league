import { createRouter, createWebHistory } from 'vue-router';
import LeagueService from './services/LeagueService';

const routes = [
  {
    name: 'Schedule',
    path: '/',
    component: () => import('./pages/Schedule.vue'),
  },
  {
    name: 'Leaderboard',
    path: '/leaderboard',
    component: () => import('./pages/Leaderboard.vue'),
  },
  {
    name: 'PageNotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const hasToken = localStorage["token"];

  if (!hasToken & to.name !== 'PageNotFound') {
    const leagueService = new LeagueService();

    try {
      await leagueService.getAccessToken();

      return true;
    } catch (error) {
      return { name: 'PageNotFound' }
    }
  }
})

export default router;
