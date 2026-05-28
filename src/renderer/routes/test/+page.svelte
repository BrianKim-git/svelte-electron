<script lang="ts">
  import { goto } from '$app/navigation'
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up'
  import { Button } from '$lib/components/ui/button/index.js'
</script>

<h1>Test Page</h1>
<p>ファイルシステムベースのルーターのテストページです。</p>
<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <Button variant="outline">Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>
<Button variant="outline" onclick={() => goto('/')}>← ルートへ移動</Button>
