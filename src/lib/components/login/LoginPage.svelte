<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import token from '$lib/stores/tokenStore';
	let username = '';
	let password = '';
	async function handleSubmit(event: SubmitEvent) {
		const loggedIn = await token.login(username, password);
		if (loggedIn) {
			const redirectTo = $page.url.searchParams.get('redirect');
			goto(redirectTo == null ? `${base}/` : redirectTo);
		}
	}
</script>

<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
	<div
		class="w-full p-6 bg-black border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg"
	>
		<h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
		<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
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
				<input type="submit" class="btn btn-primary" value="Submit" />
			</div>
		</form>
	</div>
</div>
