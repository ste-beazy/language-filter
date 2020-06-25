import 'chai-http'
import * as chai from 'chai'
chai.use(require('chai-http'))
import request from 'supertest'
import nock from 'nock'

import app from '..'

describe('API Endpoint(s)', () => {
	const expect = chai.expect
	const scope = nock('https://api.github.com')

	describe('GET /?username&language', () => {
		it('Returns 400 when no parameters in query', async () => {
			const res = await request(app).get('/').query({})
			expect(res.status).equals(400)
		})

		it('Returns empty when none found', async () => {
				scope.get('/search/users?q=meow+language:something&in:login&type=Users')
				.reply(200, { items: [] })
			const res = await request(app).get('/').query({ username: 'meow', language: 'something' })
			expect(res.status).equals(404)
		})

		it('Returns single user for ', async () => {
			scope.get('/search/users?q=test-username+language:python&in:login&type=Users')
				.reply(200, {
					items: [{
						url: 'https://api.github.com/users/alink'
					}]
				})
				.get('/users/alink')
				.reply(200, {
					avatar_url: 'something',
					login: 'test-username',
					followers: 3,
					name: 'diana prince',
					url: '/alink',
					public_repos: 3,
					created_at: new Date().toISOString()
				})
				
			const res = await request(app).get('/').query({ username: 'test-username', language: 'python' })
			expect(res.status).equals(200)
			expect(res.body).length(1)
			expect(res.body[0]).property('publicRepos', 3)
			expect(res.body[0]).property('avatarUrl', 'something')
			expect(res.body[0]).property('followers', 3)
			expect(res.body[0]).property('name', 'diana prince')
			expect(res.body[0]).to.have.property('createdAt')
			expect(res.body[0]).to.not.have.property('login')
			expect(res.body[0]).to.not.have.property('url')
		})
	})
})