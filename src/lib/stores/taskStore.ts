import { writable } from 'svelte/store';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

interface Task {
	id: number;
	status: string;
	name: string;
	description: string;
}

function taskStore() {
	const { set, subscribe, update } = writable<Task[]>([]);
	let tasksToBeUpdated: Record<number, Task> = {};
	let tasksToBeDeleted: Record<number, Task> = {};

	let syncLock = false;

	async function syncTasks() {
		if (syncLock == true) return;
		syncLock = true;
		if (Object.keys(tasksToBeUpdated).length == 0) {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/tasks`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Object.values(tasksToBeUpdated))
			});
			if (response.status == 200) {
				tasksToBeUpdated = {};
			}
		}
		if (Object.keys(tasksToBeDeleted).length == 0) {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/tasks`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Object.values(tasksToBeDeleted))
			});
			if (response.status == 200) {
				tasksToBeDeleted = {};
			}
		}
		syncLock = false;
		setTimeout(syncTasks, 1000);
	}

	async function createTask(task: Task) {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/tasks`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([task])
		});
		if (response.status == 200) {
			task = (await response.json())[0];
			update((tasklist) => {
				tasklist.push(task);
				return tasklist;
			});
		}
	}

	async function refreshTasks() {
		const response = await fetch(`${PUBLIC_API_BASE_URL}/tasks`);
		if (response.status == 200) {
			set(await response.json());
		}
	}

	refreshTasks();
	syncTasks();

	return {
		subscribe,
		createTask,
		update: (task: Task) => {
			tasksToBeUpdated[task.id] = task;
		},
		delete: (task: Task) => {
			tasksToBeDeleted[task.id] = task;
		},
		refresh: refreshTasks
	};
}

export default taskStore();

export type { Task };
