<script>
	import KanbanCategory from './KanbanCategory.svelte';
	export const categories = [
		{ title: 'To Do', status: 'toDo' },
		{ title: 'In Progress', status: 'inProgress' },
		{ title: 'Done', status: 'done' }
	];
</script>

<div class="flex justify-center mt-10">
	{#each categories as category}
		<KanbanCategory {...category} />
	{/each}
</div>
