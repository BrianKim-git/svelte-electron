<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'

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

<Card.Root class="-my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>Svelte + Electron</Card.Title>
  </Card.Header>
  <Card.Content>
    <section>
      <div>{msg}!!!</div>

      <Button
        variant="outline"
        onclick={() => {
          count++
          msg = ''
        }}>count: {count}</Button
      >
      <Button variant="outline" onclick={ping}>ping main process</Button>
    </section>

    <section>
      <h2>Notes</h2>
      <Button variant="outline" onclick={loadNotes} disabled={loading}>
        {loading ? 'loading...' : 'load notes'}
      </Button>

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
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button variant="link" onclick={() => goto('/test')}>→ Testページへ移動</Button>
  </Card.Footer>
</Card.Root>
