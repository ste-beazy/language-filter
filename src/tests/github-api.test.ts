import 'chai-http'
import * as chai from 'chai'
chai.use(require('chai-http'))
import nock from 'nock'

import GitHubApi from '../github/github-api'

describe('GithubApi Test', () => {
	const expect = chai.expect
	const scope = nock('https://api.github.com')

	describe('GET Users', () => {
		it('Returns empty array when no users found', async () => {
			const queryString = 'cat+language:python'
			scope.get(`/search/users?q=${queryString}&in:login&type=Users`)
			.reply(200, {
				items: []
			})
			const res = await GitHubApi.fetchUsers(queryString)
			expect(res).to.have.lengthOf(0)
		})

		it('Returns correct amount of users', async () => {
			const queryString = 'cat+language:python'
			scope.get(`/search/users?q=${queryString}&in:login&type=Users`)
			.reply(200, {
				items: [
					{ url: 'https://api.github.com/users/cat' },
					{ url: 'https://api.github.com/users/dog' },
				]
			})
			.get(`/users/cat`)
			.reply(200, {
				items: [
					{ name: 'cat' },
				]
			})
			.get(`/users/dog`)
			.reply(200, {
				items: [
					{ name: 'cat' },
				]
			})
			const res = await GitHubApi.fetchUsers(queryString)
			expect(res).to.have.lengthOf(2)
		})
	})
})
