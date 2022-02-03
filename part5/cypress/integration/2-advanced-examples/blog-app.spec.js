describe('Blog app', function() {
    const createUser = {
        name: "Daniel",
        username: "danny",
        password: "danny"
    };

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function() {
        cy.contains('Register');
        cy.contains('Login');
    });

    describe('Register and Login', function() {

        it('Register Succeeds with correct inputs', function() {
            cy.get('#registerName').type(createUser.name);
            cy.get('#registerUsername').type(createUser.username);
            cy.get('#registerPassword').type(createUser.password);
            cy.get('#registerButton').click();
        });

        it('Login fails with wrong credentials', function() {
            cy.get('#loginUsername').type(createUser.username);
            cy.get('#loginPassword').type('wrong pw');
            cy.get('#loginButton').click();
            cy.get('.error').should('contain', 'User doesn\'t exist');
        })

        it('Login succeeds with correct credentials', function() {
            cy.get('#loginUsername').type(createUser.username);
            cy.get('#loginPassword').type(createUser.password);
            cy.get('#loginButton').click();
        });
    });

    describe("When logged in", function() {

        beforeEach(function() {
            cy.register({ name: createUser.name, 
                username: createUser.username,
                password: createUser.password });
            cy.login({ username: createUser.username, password: createUser.password });
        });

        it("A blog can be created", function() {
            cy.get("#create-new").click();
            cy.get(".newTitle").type("Test by Cypress");
            cy.get(".newAuthor").type("Cypress");
            cy.get(".newURL").type("http://localhost.com");
            cy.get("#submit-new-blog").click();

            cy.get(".blog-title").should("contain", "Test by Cypress");
        });

        it("A blog can be liked", function() {
            const blog = {
                title: "Test by Cypress",
                author: "Cypress",
                url: "http://localhost.com"
            }
            cy.createBlog(blog);

            cy.get(".toggle-blog").click();
            cy.get("#like-btn").click();

            cy.get(".likeCount").should("contain", "1");
        });

        it("Blog can be deleted by user", function() {

            const blog = {
                title: "Test by Cypress",
                author: "Cypress",
                url: "http://localhost.com"
            }
            cy.createBlog(blog);

            cy.get(".toggle-blog").click();
            cy.get("#delete").click();

            cy.get(".blogItemContainer").should("not.exist");
        });

        describe("Post dummy blogs and test", function() {
            beforeEach(function() {
                cy.insertDummyBlogs();
            });

            it("Blogs are sorted", function() {
                cy.get(".toggle-blog").each((blog) => {
                    blog.click();
                });

                cy.get(".likeCount").then(resBlogs => {
                    Array.from(resBlogs).forEach((resBlog, i) => {
                        if (i !== (resBlogs.length - 1)) {
                            expect(parseInt(resBlog.childNodes[1].data)).to.be.greaterThan(parseInt(resBlogs[i + 1].childNodes[1].data));
                        }
                    });
                });
            });
        });

    });
});