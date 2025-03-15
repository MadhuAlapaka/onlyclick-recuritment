describe('Auth Tests', () => {
    it('Should sign up a new user', () => {
        cy.request('POST', 'http://localhost:3000/signup', {
            username: 'testuser',
            password: 'password123'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Signup successful");
        });
    });

    it('Should log in and access protected route', () => {
        cy.request('POST', 'http://localhost:3000/login', {
            username: 'testuser',
            password: 'password123'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            const token = response.body.token;

            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/protected',
                headers: { Authorization: token }
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('message', 'Protected content');
            });
        });
    });
});
