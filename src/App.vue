<template>
  <div class="container py-3">
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
  import TheHeader from './components/layouts/TheHeader.vue';
  import TheFooter from './components/layouts/TheFooter.vue';

  export default {
      components: {
        'the-header': TheHeader,
        'the-footer': TheFooter,
      }
  }
</script>

<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>