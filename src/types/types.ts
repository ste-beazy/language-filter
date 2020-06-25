export interface RawUser {
	login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  type: any
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: any
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
	following: number
  created_at: string
  updated_at: string
}

export interface UserResponse {
	createdAt: string
	publicRepos: number
	followers: number
	username: string
	name: string
	avatarUrl: string
}