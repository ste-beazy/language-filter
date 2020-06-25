import fetch, { Headers } from 'node-fetch'

import { timeout } from '../helpers/'
import { RawUser } from '../types'

class GithubApi {
	public timeoutLimit: number
	private base: string
	private headers: Headers
	constructor() {
			this.timeoutLimit = 1000
			this.base = 'https://api.github.com'
	}

	async fetchUsers(query: string): Promise<RawUser[]> {
			try {
					const res: any = await timeout(this.timeoutLimit, fetch(`${this.base}/search/users?q=${query}&in:login&type=Users`, {
							headers: this.headers
					}))
					const { items } = await res.json()
					if (!items.length) return []

					return Promise.all(items.map((user: any) => this.fetchUserFromUrl(user.url)))    
			} catch (e) {
				console.error(e)
				throw(e)
			}
	}

	private async fetchUserFromUrl(url: string): Promise<RawUser> {
			const res = await timeout(this.timeoutLimit, fetch(url, { headers: this.headers }))
			const user = res.json()
			return user
	}
}

const api = new GithubApi()

export default api