let chai = require('chai');
let expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
let chaiHttp = require('chai-http');
let server = require('../app');
require('dotenv').config();

// Assertion Style
chai.should();
chai.expect();

chai.use(chaiHttp);

describe('Recipes API', () => {
  // Test GET recipes
  describe('GET /api/recipes', () => {
    it('It should get all the recipes', (done) => {
      chai
        .request(server)
        .get('/api/recipes')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });
  });

  // Test GET recipes by id
  describe('GET /api/recipes/:id', () => {
    it('It should get a recipe by id', (done) => {
      const recipeId = 169;
      chai
        .request(server)
        .get('/api/recipes/' + recipeId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('ingredients');
          response.body.should.have.property('user');
          response.body.should.have.property('id').eq('169');
          done();
        });
    });

    it('It should not get a recipe by id', (done) => {
      const recipeId = 120;
      chai
        .request(server)
        .get('/api/recipes/' + recipeId)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  //Test Search Ingredients
  describe('POST /api/ingredients', () => {
    it('It should search for nutrients by filter and pageNumber', (done) => {
      const query = {
        filter: 'meat',
        pageNumber: 1,
      };

      chai
        .request(server)
        .post('/api/ingredients')
        .set({ Authorization: `Bearer ${process.env.MOCK_TOKEN}` })
        .send({ query })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('currentPage').eq(1);
          done();
        });
    });
  });

  //Test get ingredient details
  describe('POST /api/ingredients/:id', () => {
    it('It should get nutrient details by id', (done) => {
      const nutrientId = 513506;

      chai
        .request(server)
        .get('/api/ingredients/' + nutrientId)
        .set({ Authorization: `Bearer ${process.env.MOCK_TOKEN}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id').eq(513506);
          response.body.should.have.property('description').eq('BEE POLLEN');
          done();
        });
    });
  });

  //Test Calculate Nutrients
  describe('POST /api/nutrients', () => {
    it('It should calculate nutrients by ingredient id array', (done) => {
      const query = {
        objectToSend: {
          searchArray: [746776, 746777],
          dataToSend: { '746776': 100, '746777': 100 },
        },
      };

      chai
        .request(server)
        .post('/api/nutrients')
        .set({ Authorization: `Bearer ${process.env.MOCK_TOKEN}` })
        .send(query)
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body).to.be.an('array').that.deep.includes({
            name: 'Protein',
            amount: 4.87,
            unitName: 'G',
          });
          done();
        });
    });
  });
});
