import fetch, { Headers } from 'node-fetch'

class GithubApi {
    public clientId: string
    private clientSecret: string
    private baseUrl: string
    private headers: Headers
    constructor() {
        this.clientId = 'swerve'
        this.clientSecret = 'onem'
        this.baseUrl = 'https://api.github.com'
    }

    async authenticate (code: any) {
        try {
            // TODO: Add wrapper function to handle res.json()
            const { access_token } = await fetch(`https://github.com/login/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            }).then((res) => res.json())
            const headers = new Headers()
            headers.append('Authorization', 'token ' + access_token);
            headers.append("X-GitHub-Media-Type", "github.v3")
            headers.append('Accept', 'application/json')
            this.headers = headers
        } catch (e) {
            // TODO: Add proper error handling
            console.log({ e })
        }
    }

    async fetchUsers(query: string): Promise<any> {
        try {
            const res = await fetch(`${this.baseUrl}/search/users?q=${query}&in:login&type=Users`, {
                headers: this.headers
            })
            const { items } = await res.json()
            if (!items.length) return []

            return Promise.all(items.map((user: any) => this.fetchUser(user.url)))    
        } catch (e) {
            console.log({ e })
        }
    }

    async fetchUser(url: string) {
        const res = await fetch(url, { headers: this.headers })
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