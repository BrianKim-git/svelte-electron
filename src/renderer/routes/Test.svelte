<script lang="ts">
  import { push } from 'svelte-spa-router'
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up'
  import { Button } from '$lib/components/ui/button/index.js'
</script>

<h1>Test Page</h1>
<p>SPAルーター使用</p>
<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <Button variant="outline">Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>
<Button variant="outline" onclick={() => push('/')}>← ルートへ移動</Button>
