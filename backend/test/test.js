const expect = require('chai').expect;
const getRouter = require('../routes/getRouter');
const mongoose      = require('mongoose');

describe('mi primer test', () =>{
    
    it('Deberia conectarse a la BD', async () =>{
        let res = false;
        try{
            await mongoose.connect('mongodb://developer:dev@localhost/plantitas', {useNewUrlParser: true, useUnifiedTopology: true});
            res = true;
        }catch(err){
            console.err(err);
            throw err;
        }
        expect(res).to.equal(true);
    });
}); 