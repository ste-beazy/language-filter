import fetch, { Headers } from 'node-fetch'
import base64 from 'base-64'

let username = ''
let password = ''

const headers = new Headers()
headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
headers.append("X-GitHub-Media-Type", "github.v3")

class GithubApi {
    private baseUrl: string
    constructor() {
        this.baseUrl = 'https://api.github.com'
    }

    async fetchUsers(query: string): Promise<any> {
        const res  = await fetch(`${this.baseUrl}/search/users?q=${query}&in:login&type=Users`, {
            headers
        })
        const users = await res.json()
        if (!users.length) return []

        return Promise.all(users.items.map((user: any) => this.fetchUser(user.url)))
    }

    async fetchUser(url: string) {
        const res = await fetch(url, { headers })
        const user = await res.json()
        return {
            avatar_url: user.avatar_url,
            username: user.login,
            followers: user.followers,
            name: user.name ? user.name : null
        }
    }
}

const api = new GithubApi()

export default api