import { TestBed, async } from '@angular/core/testing';
import { FilterProducts } from './products.filter';

describe('App: Products Filter', () => {
 beforeEach(() => {
   this.products = [
       {_id: '11', name: 'Prod 1', shortDescription: 'Desc A'},
       {_id: '12', name: 'Prod 2', shortDescription: 'Desc B'},
       {_id: '13', name: 'Prod 3', shortDescription: 'Desc C'},
       {_id: '14', name: 'Prod 4', shortDescription: 'Desc A'},
       {_id: '15', name: 'Prod 5', shortDescription: 'Desc A'},

   ];
   TestBed.configureTestingModule({
     declarations: [
       FilterProducts
     ],
   });


   describe('FilterProducts', () => {
    let pipe = new FilterProducts();
    it('1. No search string returns nothing', () => {
        let results = pipe.transform(this.products, '');
        expect(results.length).toBe(0);
    });

    it('2. Empty array returns empty array', () => {
        let results = pipe.transform([], 'Hi');
        expect(results.length).toBe(0);
    });

    it('3. Valid input and args', () => {
        let results = pipe.transform(this.products, 'desc a');
        expect(results.length).toBe(3);
        expect(results[0]._id).toBe(11);
        expect(results[1]._id).toBe(14);
        expect(results[2]._id).toBe(15);
    });
    //...More tests
  });
});

 });
