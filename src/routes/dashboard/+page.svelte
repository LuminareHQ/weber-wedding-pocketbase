<script lang="ts">
    import {onMount} from "svelte";
    import {clipboard, getToastStore} from "@skeletonlabs/skeleton";
    import {client} from "$lib/pocketbase";

    import {
        ProgressRadial,
        Accordion,
        AccordionItem,
    } from "@skeletonlabs/skeleton";

    const toastStore = getToastStore();

    let listData: any = [];

    let errorMessage = "";

    let username = "";
    let password = "";

    let countAwaiting = 0;
    let countAttending = 0;
    let countNotAttending = 0;

    onMount(async () => {
        await loadData();
    });

    client.authStore.onChange(() => {
        location.reload();
    });

    async function login() {
        try {
            await client
                .collection("users")
                .authWithPassword(username, password);
        } catch (error: any) {
            toastStore.trigger({
                message: error.message,
                background: "variant-filled-error",
            });
        }
    }

    async function loadData() {
        listData = [];
        listData = await client
            .collection("family")
            .getFullList({sort: "last_name", expand: "people"});
        let peopleList: any = [];
        listData.forEach((record: any) => {
            record.expand.people.forEach((person: any) => peopleList.push(person));
        });
        countAwaiting = peopleList.filter(
            (person: any) => person.attending_status == 0
        ).length;
        countAttending = peopleList.filter(
            (person: any) => person.attending_status == 1
        ).length;
        countNotAttending = peopleList.filter(
            (person: any) => person.attending_status == 2
        ).length;
    }

    async function updateFamily(family: any) {
        await client.collection("family").update(family.id, family);
    }
</script>

{#if client.authStore.isValid}
    {#if listData.length > 0}
        <div class="flex flex-col max-w-2xl m-auto gap-4 w-[90%] mb-8">
            <div class="card flex">
                <table class="table table-auto">
                    <thead>
                    <tr>
                        <th colspan="4" class="text-center font-bold text-lg"
                        >Attending Information
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Awaiting</th>
                        <th>Attending</th>
                        <th>Not Attending</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td class="text-center font-bold">{countAwaiting}</td>
                        <td class="text-center font-bold">{countAttending}</td>
                        <td class="text-center font-bold">{countNotAttending}</td>
                        <td class="text-center font-bold"
                        >{countAwaiting + countAttending + countNotAttending}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col card">
                <div class="variant-filled-secondary p-4 overflow-hidden rounded-t-2xl">
                    <h2 class="h2">Party Information</h2>
                    <p>Alphabetical Order</p>
                </div>

                <Accordion>
                    {#each listData as family }
                        <AccordionItem>
                                <svelte:fragment slot="lead">
                                    <div
                                            class="rounded-full w-8 h-8 items-center justify-center flex">
                                        <ProgressRadial
                                                value={(family.expand.people.filter(
                      (person) => person.attending_status === 1
                    ).length /
                      family.expand.people.length) *
                      100}
                                                font={200}
                                                stroke={50}
                                                meter="stroke-success-500"
                                                track="stroke-success-800">
                                            {#if family.expand.people.filter((person) => person.attending_status !== 0).length === family.expand.people.length}
                                                ✅
                                            {:else}
                                                {family.expand.people.filter(
                                                    (person) => person.attending_status !== 0
                                                ).length}/{family.expand.people.length}
                                            {/if}
                                        </ProgressRadial>
                                    </div>
                                </svelte:fragment>
                                <svelte:fragment slot="summary"
                                >
                                    <p>{family.last_name}</p>
                                </svelte:fragment>
                            <svelte:fragment slot="content">
                                <hr class="!border-t-4"/>
                                <div>
                                    <table class="table p-2">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="text-center font-bold text-lg"
                                            >{family.last_name} Party Information
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><p>RSVP Code</p></td>
                                            <td
                                                    class="flex flex-row w-full items-center justify-between"
                                            ><p class="font-bold">
                                                {family.rsvp_code}
                                            </p>
                                                <button
                                                        class="btn variant-filled px-2 py-0.5"
                                                        use:clipboard={family.rsvp_code}
                                                        on:click={() =>
                              toastStore.trigger({
                                message: "Copied to clipboard",
                                background: "variant-filled-success",
                                hideDismiss: true,
                                timeout: 3000,
                              })}>
                                                    Copy
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p>Save The Date Sent</p></td>
                                            <td class="flex flex-row gap-4 font-bold"
                                            ><input
                                                    class="input w-auto min-w-[24px]"
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                    bind:checked={family.save_the_date_sent}
                                                    on:change={() =>
                              updateFamily(
                                family
                              )}/>{family.save_the_date_sent}</td>
                                        </tr>
                                        <tr>
                                            <td><p>Invite Sent</p></td>
                                            <td class="flex flex-row gap-4 font-bold"
                                            ><input
                                                    class="input w-auto min-w-[24px]"
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                    bind:checked={family.invite_sent}
                                                    on:change={() =>
                              updateFamily(family)}/>{family.invite_sent}</td>
                                        </tr>
                                        <tr>
                                            <td><p>Songs</p></td>
                                            <td>
                                                <Accordion>
                                                    <AccordionItem>
                                                        <svelte:fragment slot="summary"
                                                        ><p>Toggle Content</p></svelte:fragment>
                                                        <svelte:fragment slot="content"
                                                        ><textarea
                                                                class="input"
                                                                name=""
                                                                id=""
                                                                cols="30"
                                                                rows="6"
                                                                bind:value={family.songs}
                                                                readonly/></svelte:fragment
                                                        >
                                                    </AccordionItem
                                                    >
                                                </Accordion
                                                >
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p>Recipe</p></td>
                                            <td
                                            >
                                                <Accordion>
                                                    <AccordionItem>
                                                        <svelte:fragment slot="summary"
                                                        ><p>Toggle Content</p></svelte:fragment>
                                                        <svelte:fragment slot="content"
                                                        ><textarea
                                                                class="input"
                                                                name=""
                                                                id=""
                                                                cols="30"
                                                                rows="6"
                                                                bind:value={family.recipe}
                                                                readonly/></svelte:fragment
                                                        >
                                                    </AccordionItem
                                                    >
                                                </Accordion
                                                >
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="table p-2 border-spacing-1 border-2">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="text-center font-bold text-lg"
                                            >{family.last_name} Attending Information
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th class="text-left px-3">Name</th>
                                            <th class="text-left px-3">Status</th>
                                        </tr>
                                        {#each family.expand.people as person}
                                            <tr>
                                                <td>
                                                    {#if person.name.length > 0}
                                                        {person.name}
                                                    {:else}
                                                        <p>+1</p>
                                                    {/if}
                                                </td>
                                                <td class="flex justify-between">
                                                    {#if person.attending_status === 0}
                                                        <p>Awaiting Response</p>
                                                    {:else if person.attending_status === 1}
                                                        <p>Is Attending</p>
                                                    {:else if person.attending_status === 2}
                                                        <p>Is Not Attending</p>
                                                    {/if}
                                                </td>
                                            </tr>
                                        {/each}
                                        </tbody>
                                    </table>
                                </div>
                                <hr class="!border-t-4"/>
                            </svelte:fragment>
                        </AccordionItem>
                    {/each}
                </Accordion>
            </div>
        </div>
    {:else}
        <div class="flex w-full h-full flex-col items-center justify-center">
            <ProgressRadial
                    value={undefined}
                    stroke={40}
                    meter="stroke-primary-500"
                    track="stroke-primary-500/30"
                    width="w-8"/>
            <p>Loading</p>
        </div>
    {/if}
{:else}
    <div
            class="flex flex-col m-auto max-w-2xl h-full w-[90%] gap-2 mb-8 items-center justify-center">
        <div class="card p-2 gap-2 items-center justify-center flex flex-col">
            <h3 class="h3">Login</h3>
            <input
                    class="input text-left"
                    type="text"
                    name=""
                    id=""
                    placeholder="Username"
                    bind:value={username}/>
            <input
                    class="input text-left"
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                    bind:value={password}/>
            <button class="btn variant-filled" on:click={login}>Login</button>
            <p>{errorMessage}</p>
        </div>
    </div>
{/if}
