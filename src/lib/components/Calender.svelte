<script lang="ts">
	let today = new Date();
	let day = today.getDay();
	let startOfWeek = new Date(today.getTime() - day * 24 * 60 * 60 * 1000);
	const date = new Date('2016-12-31T23:59:60Z');
	const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
</script>

{#each [1, 2, 3, 4, 5] as i}
	{#each days as day}
		day
	{/each}
{/each}
