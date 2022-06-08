<template>
  <img
    :src="`https://countryflagsapi.com/png/${flags[country].name}`"
    :alt="country"
    class="flag-icon"
  />
</template>

<script>
import { flags } from '@/constants/flags';

export default {
  name: 'Flag',
  props: {
    country: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flags,
    };
  },
}
</script>

<style lang="scss" scoped>
.flag-icon {
  width: 53px;
  height: 37px;

  @media (max-width: 460px) {
    width: 26px;
    height: 18px;
  }
}
</style>
