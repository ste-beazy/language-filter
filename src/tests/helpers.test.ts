import 'chai-http'
import * as chai from 'chai'
chai.use(require('chai-http'))

import { constructQuery, timeout } from '../helpers/'

describe('Helpers test(s)', () => {
	const expect = chai.expect
	describe('constructQuery test', () => {
		it('Returns correct format for one username, one language', () => {
			const params = { username: 'marydo', language: 'python' }
			const res = constructQuery(params)
			expect(res).equals('marydo+language:python')
		})
	
		it('Returns correct format for one username, multiple languages', () => {
			const params = { username: 'marydo', language: ['python', 'javascript', 'golang'] }
			const res = constructQuery(params)
			expect(res).equals('marydo+language:python&language:javascript&language:golang')
		})
	})
	
	describe('Timeout test', () => {
		it('Aborts after timeout (1000ms) expires before promise resolved', async () => {
			try {
				const passingCallback = new Promise((resolve, reject) => setTimeout(() => resolve, 2000))
				await timeout(1000, passingCallback)
			} catch (e) {
				expect(e.message).equals('timeout')
			}
		})
	
		it('Promise resolved successfully without interruption from timeout', async () => {
			try {
				const passingCallback = new Promise((resolve, reject) => setTimeout(() => resolve({ passed: true }), 777))
				const res: any = await timeout(1000, passingCallback)
				expect(res).haveOwnProperty('passed')
				expect(res.passed).equals(true)
			} catch (e) {
				expect(e).equals(undefined)
			}
		})
	})
})
