import express from 'express'

import Api from './github/github-api'
import { constructQuery } from './helpers/query-helper'

const app = express()

app.get('/', async (req, res) => {
    const queryParams = constructQuery(req.query)
    try {
        const users = await Api.fetchUsers(queryParams)
        if (!users.length) {
            return res.send({ message: 'Sorry, no users were found that matched your search.' })
        }
        res.send({ users })
    } catch (e) {
        res.status(400).send({ message: 'Something went wrong', error: {...e} })
    }
})

app.listen(8080, () => {
    console.log('we in this')
})