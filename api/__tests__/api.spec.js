const request = require('supertest')

const app = require('../api')

describe('API Server', () =>{
    let api;

    beforeAll(() => {
        api = app.listen(5000,()=> {
            console.log('API Server is running on port 3000')
        })
    })

    afterAll((done)=> {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('responds to GET / with status code 200', (done) =>{
        request(api)
        .get('/')
        .expect(200, done)
    })

    test('responds to invalid method request with 404',(done) =>{
        request(api).post('/').expect(404, done)
    })
})
