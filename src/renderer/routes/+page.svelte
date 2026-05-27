<script lang="ts">
  import { goto } from '$app/navigation'

  let count = $state(0)
  let msg = $state('')
  let notes = $state<Note[]>([])
  let loading = $state(false)

  async function ping() {
    const result = await window.api.ping()
    msg = result
  }

  async function loadNotes() {
    loading = true
    notes = await window.api.notes.findMany()
    loading = false
  }
</script>

<h1>Svelte + Electron</h1>
<button onclick={() => goto('/test')}>→ Test 페이지로 이동</button>

<section>
  <div>{msg}!!!</div>
  <button onclick={() => { count++; msg = '' }}>count: {count}</button>
  <button onclick={ping}>ping main process</button>
</section>

<section>
  <h2>Notes</h2>
  <button onclick={loadNotes} disabled={loading}>
    {loading ? 'loading...' : 'load notes'}
  </button>

  {#if notes.length === 0 && !loading}
    <p>no notes found. try <code>npm run db:migrate</code> first.</p>
  {:else}
    <ul>
      {#each notes as note (note.id)}
        <li>
          <strong>{note.title}</strong>
          {#if note.body}<p>{note.body}</p>{/if}
          <small>{note.createdAt}</small>
        </li>
      {/each}
    </ul>
  {/if}
</section>
