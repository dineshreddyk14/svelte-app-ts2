import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import { page } from '$app/stores';
import { browser } from '$app/environment';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

function tokenStore() {
	const { set, subscribe } = writable<string>('');
	if (browser) {
		const storedToken = window.localStorage.getItem('token');
		if (storedToken != null) {
			set(storedToken);
		}
	}

	async function refresh() {
		let currentPageUrl = '/';
		page.subscribe((v) => {
			currentPageUrl = v.url.pathname;
		});
		if (browser) {
			window.localStorage.setItem('token', '');
		}
		goto(`/login?redirect=${currentPageUrl}`);
	}

	async function login(username: string, password: string): Promise<boolean> {
		const a = await fetch(`${PUBLIC_API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const b = await a.json();
		if ('token' in b) {
			window.localStorage.setItem('token', b['token']);
			set(b['token']);
			return true;
		} else {
			return false;
		}
	}

	return {
		subscribe,
		refresh,
		login
	};
}

export default tokenStore();
