import fetch, { Headers } from 'node-fetch'

import { timeout } from '../helpers/'

class GithubApi {
	public timeoutLimit: number
	private base: string
	private headers: Headers
	constructor() {
			this.timeoutLimit = 1000
			this.base = 'https://api.github.com'
	}

	async fetchUsers(query: string): Promise<any> {
			try {
					const res: any = await timeout(this.timeoutLimit, fetch(`${this.base}/search/users?q=${query}&in:login&type=Users`, {
							headers: this.headers
					}))
					const { items } = await res.json()
					if (!items.length) return []

					return Promise.all(items.map((user: any) => this.fetchUserFromUrl(user.url)))    
			} catch (e) {
				// what could possibly go wrong?
			}
	}

	async fetchUserFromUrl(url: string) {
			const res = await timeout(this.timeoutLimit, fetch(url, { headers: this.headers }))
			const user = await res.json()
			return {
				avatarUrl: user.avatar_url,
				username: user.login,
				followers: user.followers,
				name: user.name,
				publicRepos: user.public_repos,
				createdAt: user.created_at
			}
	}
}

const api = new GithubApi()

export default api