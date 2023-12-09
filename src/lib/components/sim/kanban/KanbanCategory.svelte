<script lang="ts">
	import KanbanTask from './KanbanTask.svelte';
	import tasks_store, { type Task } from '$lib/stores/taskStore';

	export let title = 'Default title';
	export let status = '';

	$: tasks = $tasks_store.reduce<Task[]>((tasklist, task) => {
		if (task.status == status) tasklist.push(task);
		return tasklist;
	}, []);

	function createTask(e: any) {
		const newTask = { name: 'Hi', description: 'coco', status, id: 0 };
		tasks_store.createTask(newTask);
	}
</script>

<div class="w-1/3">
	<div class="mb-4 rounded-lg bg-gray-200 p-4 shadow-lg">
		<h2 class="mb-2 text-lg font-semibold">{title}</h2>
		<div class="rounded-lg bg-white p-2 shadow-sm">
			{#each tasks as task}
				<KanbanTask {...task} />
			{/each}
			<button on:click={createTask}>HHHHHHHHH</button>
		</div>
	</div>
</div>
