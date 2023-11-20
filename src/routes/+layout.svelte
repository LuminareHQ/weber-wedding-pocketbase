<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
 
	inject({ mode: dev ? 'development' : 'production' });

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
//   import { title } from 'process';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<Toast position="b" />

<svelte:head>
	<title>Weber Wedding</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
