<script lang="ts">
  import { goto } from '$app/navigation'
</script>

<h1>Test Page</h1>
<p>디렉토리 라우팅 테스트 페이지예요.</p>

<button onclick={() => goto('/')}>← 루트로 이동</button>
