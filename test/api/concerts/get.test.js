const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testConOne = new Concert ({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'electronic', price: 12, day: 15, image: 'image.jpg' });
        await testConOne.save();
      
        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Amanda Doe', genre: 'reggae', price: 14, day: 2, image: 'image2.jpg' });
        await testConTwo.save();

        const testConThree = new Concert({ _id: 'b87dd02d6ecd287182712351', performer: 'John Doe', genre: 'reggae', price: 28, day: 8, image: 'image3.jpg' });
        await testConThree.save();
      });
      
      after(async () => {
        await Concert.deleteMany();
    });


    it('/performer/:performer should return concerts by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
  
    it('/genre/:genre should return concerts by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/reggae');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
  
    it('/price/:price_min/:price_max should return concerts between price_min and price_max', async () => {
        const res = await request(server).get('/api/concerts/price/10/20');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/day/:day should return concerts by day', async () => {
        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    }); 
});