import { UserResponse, RawUser } from '../types'

export function transformUser(user: RawUser): UserResponse {
	return {
		avatarUrl: user.avatar_url,
		username: user.login,
		followers: user.followers,
		name: user.name,
		publicRepos: user.public_repos,
		createdAt: user.created_at
	}
}