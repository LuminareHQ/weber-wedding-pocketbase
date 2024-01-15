<script lang="ts">
    import {goto} from "$app/navigation";
    import {client} from '$lib/pocketbase'
    import {ProgressRadial, getToastStore} from "@skeletonlabs/skeleton";
    import {onMount} from 'svelte'

    const toastStore = getToastStore();

    let error: any = null;

    let rsvpCode: string = "";
    let loading: boolean = false;
    let issue: boolean = false;

    let backend_online = false;

    let processing = false;

    $: {
        rsvpCode = rsvpCode.toUpperCase();
        goToPanel();
    }

    async function goToPanel() {
        if (processing) return;
        processing = true;
        issue = false;
        loading = true;
        rsvpCode = rsvpCode.toUpperCase();
        if (rsvpCode.length < 4) {
            loading = false;
            processing = false;
            return;
        }

        let error_toast: any;

        await client.collection('family_codes').getOne(rsvpCode).then((res) => {
            console.log(res)
            goto("/rsvp/" + res.record)
            loading = false
        }).catch(() => {
            if (!error_toast) {
                console.log(error_toast)
                error_toast = toastStore.trigger({
                    message: 'Invalid RSVP Code.',
                    background: 'variant-filled-error',
                    timeout: 5000
                })
            }
            loading = false;
            processing = false;
            return
        })
    }

    async function CheckConnection() {
        client.health.check().then((res) => {
            console.log(res)
            error = null
            backend_online = true
        }).catch((e) => {
            error = e.message
            toastStore.trigger({
                message: 'Error Communicating With Backend.',
                background: 'variant-filled-error',
                autohide: false,
            })
        })
    }

    onMount(() => {
        CheckConnection()
    })
</script>

<div class="flex flex-col w-auto h-full items-center justify-center gap-4">
    <h1 class="h1">RSVP</h1>
    {#if error == null && backend_online}
        <input
                name="RSVP Code"
                class="input max-w-[160px] w-full text-xl text-center"
                type="text"
                maxlength="4"
                placeholder="RSVP CODE"
                style="text-transform: uppercase;"
                bind:value={rsvpCode}
                on:input={goToPanel}
                disabled={!backend_online}
        />
    {:else if error && !backend_online}
        Backend Offline
    {:else}
        <ProgressRadial
                ...
                stroke={100}
                meter="stroke-primary-500"
                track="stroke-primary-500/30"
                width="w-8"
        />
    {/if}
    <p class={issue ? "opacity-100" : "opacity-0" }>Try Again</p>
    <div class={loading ? "opacity-100" : "opacity-0" + " flex items-center flex-col"}>











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
