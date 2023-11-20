<script lang="ts">
  import { goto } from "$app/navigation";
  import { client } from '$lib/pocketbase'
  import { ProgressRadial, getToastStore } from "@skeletonlabs/skeleton";

  const toastStore = getToastStore();

  let rsvpCode: string = "";
  let loading: boolean = false;
  let issue: boolean = false;

  $: {
    rsvpCode = rsvpCode.toUpperCase();
    goToPanel();
  }

  async function goToPanel() {
    issue = false;
    loading = true;
    rsvpCode = rsvpCode.toUpperCase();
    if (rsvpCode.length < 4) {
      loading = false;
      return;
    }
    try {
    const data = await client.collection('family_codes').getOne(rsvpCode)
    goto("/rsvp/" + data.record);
    } catch (e) {
      issue = true;
    }
    loading = false;
  }
</script>

<div class="flex flex-col w-auto h-full items-center justify-center gap-4">
  <h1 class="h1">RSVP</h1>
  <input
    name="RSVP Code"
    class="input max-w-[160px] w-full text-xl text-center"
    type="text"
    maxlength="4"
    placeholder="RSVP CODE"
    style="text-transform: uppercase;"
    bind:value={rsvpCode}
    on:input={goToPanel}
  />
  <p class="{issue ? "opacity-100" : "opacity-0" }">Try Again</p>
  <div class="{loading ? "opacity-100" : "opacity-0"} flex items-center flex-col">
    <ProgressRadial
      ...
      stroke={100}
      meter="stroke-primary-500"
      track="stroke-primary-500/30"
      width="w-8"
    />
    <p>Locating Your Party...</p>
  </div>
  <!-- <button class="btn variant-filled" on:click={goToPanel}>RSVP</button> -->
</div>
