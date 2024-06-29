<script lang="ts">
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {client} from "$lib/pocketbase";

    let date = new Date("June 28, 2024, 5:00 PM EST").getTime();

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    function UpdateTimeDisplay() {
        var now = new Date().getTime();
        var distance = date - now;

        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }

    onMount(() => {
        setInterval(() => {
            UpdateTimeDisplay();
        }, 1000);
    });
    UpdateTimeDisplay();
</script>

<div class="flex flex-col gap-2 h-full w-[90%] mx-auto pt-2">
    {#if !($page.url.pathname == "/dashboard")}
        <div
                class="flex lg:flex-row flex-col items-center justify-center card w-full p-2 lg:p-4 lg:relative">
            <div class="flex flex-row gap-2 lg:hidden">
                <h1 class="h1">Noah</h1>
                <h1 class="h1">&</h1>
                <h1 class="h1">Emily</h1>
            </div>
            <div class="lg:hidden">
                <p class="h2">June 28th, 2024</p>
            </div>
            <div class="lg:hidden">
                <p class="h3">
                    <!--- {(
                        days +
                        "d " +
                        hours +
                        "h " +
                        minutes +
                        "m " +
                        seconds +
                        "s"
                    ).toString()} --->
Complete!
                </p>
            </div>
            <div class="lg:flex hidden absolute left-4">
                <p class="h3">June 28th, 2024</p>
            </div>
            <div class="lg:flex flex-row gap-2 hidden">
                <h1 class="h1">Noah</h1>
                <h1 class="h1">&</h1>
                <h1 class="h1">Emily</h1>
            </div>
            <div
                    class="lg:flex hidden absolute right-4
    ">
                <table>
                    <tr>
                        <td class="h3 w-11 text-center">{days.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}d</td>
                        <td class="h3 w-11 text-center">{hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}h</td>
                        <td class="h3 w-11 text-center">{minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}m</td>
                        <td class="h3 w-11 text-center">{seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}s</td>
                    </tr>
                </table>
            </div>
        </div>
    {/if}
    <div
            class="flex lg:flex-row flex-row gap-2 items-center lg:justify-between justify-center p-4 card mx-auto mb-4 w-full lg:w-auto">
        <a href="/" class="btn variant-filled">Home</a>
        <a href="/rsvp" class="btn variant-filled">RSVP</a>
        <a
                class="btn variant-filled"
                href="https://www.amazon.com/wedding/share/weber-wedding"
                target="_blank">Registry</a>
        {#if ($page.url.pathname == "/dashboard") && client.authStore.isValid}
            <button class="btn variant-filled" on:click={() => client.authStore.clear()}>Logout</button>
        {/if}
    </div>
</div>
