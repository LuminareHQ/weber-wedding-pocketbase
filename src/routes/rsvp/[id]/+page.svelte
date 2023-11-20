<script lang="ts">
  import { onMount } from "svelte";
  import { client } from "$lib/pocketbase.js";
  import {
    ProgressRadial,
    SlideToggle,
    Accordion,
    AccordionItem,
  } from "@skeletonlabs/skeleton";

  export let data;

  let party: any = {};
  let people: any = [];
  let contains_plus_one: boolean = false;

  onMount(async () => {
    const record = await client.collection('family').getOne(data.id, {expand: 'people'});
    if (!record) return;
    party = record 
    people = record.expand.people
  })

  async function updatePerson(person) {
    const record = await client.collection('people').update(person.id, person)
  }

  async function updateFamily() {
    const record = await client.collection('family').update(party.id, party)
  }
</script>

<div class="flex flex-col w-[90%] max-w-2xl m-auto gap-2 h-full mb-4">
  {#if people.length < 1}
    <div class="flex flex-col w-full h-full items-center justify-center">
      <ProgressRadial
      ...
      stroke={100}
      meter="stroke-primary-500"
      track="stroke-primary-500/30"
      width="w-8"
    />
      <p>Loading Your Party...</p>
    </div>
  {:else}
    {#if contains_plus_one}
      <div
        class="alert variant-filled-secondary justify-between flex flex-row items-center justify-center"
      >
        <p class="flex-wrap">
          Your Party Includes a Plus One, Please Ensure Their Name is Updated.
        </p>
        <button
          class="btn variant-filled font-bold"
          on:click={() => (contains_plus_one = !contains_plus_one)}>X</button
        >
      </div>
    {/if}
    <table class="table table-auto">
      <thead>
        <tr>
          <th colspan="2" class="text-center font-bold h2"
            >{party.last_name} Party RSVP</th
          >
        </tr>
        <tr>
          <th>Name</th>
          <th>Attending</th>
          <!-- <th>Food Preference</th> -->
        </tr>
      </thead>
      <tbody>
        {#each people as person}
          <tr>
            <td
              class="text-3xl
           justify-center"
            >
              {#if person.is_plus_one}
                <input
                  class="input"
                  type="text"
                  placeholder="+1 - Update Name"
                  bind:value={person.name}
                  on:change={() => updatePerson(person)}
                />
              {:else}
                <p class="text-xl">{person.name}</p>
              {/if}
            </td>
            <td class="justify-center"
               ><!-- <SlideToggle
                active="variant-filled-secondary"
                name={person.id + "_toggle"}
                checked={person.is_attending}
                on:change={() => {
                  person.is_attending = !person.is_attending;
                  updatePerson(person);
                }}
              /> -->
              {#if person}
              <select class="select" name="" id="" bind:value={person.attending_status} on:change={() => updatePerson(person)}>
                <option value={0} disabled selected hidden>Select Attending Status</option>
                <option value={1}>Will Be Attending</option>
                <option value={2}>Will Not Be Attending</option>
              </select>

              {/if}
              </td
            >
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <td><p>Updates Are Saved Automatically.</p></td>
      </tfoot>
    </table>
    <div class="card">
      <Accordion autocollapse>
        <AccordionItem>
          <svelte:fragment slot="summary">
            <h3 class="h3">Suggest Songs</h3>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <p>If you would like, suggest a few songs you would like to heard during the reception.</p>
            <textarea class="input" name="" id="" cols="30" rows="10" bind:value={party.songs} on:input={updateFamily}></textarea>
          </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
          <svelte:fragment slot="summary">
            <h3 class="h3">Suggest A Recipe</h3>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <p>If you would like, share a recipe.</p>
            <textarea class="input" name="" id="" cols="30" rows="10" bind:value={party.recipe} on:input={updateFamily}></textarea>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
    </div>
  {/if}
</div>
