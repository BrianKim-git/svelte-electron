<script lang="ts">
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import Test from './routes/Test.svelte'

  const routes = {
    '/': Home,
    '/test': Test,
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
  <Router {routes} />
</div>
