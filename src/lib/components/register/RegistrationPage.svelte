<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { ContentType, HTTPMethod, apiFetch } from '$lib';
	let username = '';
	let password = '';
	let name = '';
	interface registrationRequest {
		username: string;
		password: string;
	}
	async function handleSubmit(event: SubmitEvent) {
		// const b = await apiFetch<authRequest, string>('/login', HTTPMethod.POST, ContentType.APP_JSON, {
		// 	username,
		// 	password
		// });
		const a = await fetch(`${PUBLIC_API_BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password, name })
		});
		const b = await a.json();
	}
</script>

<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
	<div
		class="w-full p-6 bg-black border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg"
	>
		<h1 class="text-3xl font-semibold text-center text-gray-700">Register</h1>
		<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="name">Name</label>
				<input
					bind:value={name}
					id="name"
					type="text"
					placeholder="name"
					class="w-full input input-bordered"
				/>
			</div>
			<div>
				<label for="username">Username</label>
				<input
					bind:value={username}
					id="username"
					type="text"
					placeholder="username"
					class="w-full input input-bordered"
				/>
			</div>
			<div>
				<label for="password">Password</label>
				<input
					bind:value={password}
					id="password"
					type="password"
					placeholder="password"
					class="w-full input input-bordered"
				/>
			</div>
			<!-- <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600"
				>Forget Password?</a
			> -->
			<div>
				<input type="submit" class="btn btn-primary" value="Register" />
			</div>
		</form>
	</div>
</div>
