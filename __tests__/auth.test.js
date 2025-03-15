const request = require('supertest');
const app = require('../server');

describe("Authentication API", () => {
    let token;

    it("should sign up a new user", async () => {
        const res = await request(app).post('/signup').send({
            username: "testuser",
            password: "password123"
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Signup successful");
    });

    it("should login and receive a token", async () => {
        const res = await request(app).post('/login').send({
            username: "testuser",
            password: "password123"
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    it("should access protected route with valid token", async () => {
        const res = await request(app)
            .get('/protected')
            .set("Authorization", token);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Protected content");
    });

    it("should deny access without token", async () => {
        const res = await request(app).get('/protected');
        expect(res.status).toBe(403);
    });
});
