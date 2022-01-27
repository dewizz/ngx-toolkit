import {DEFAULT_DIRECTION, DEFAULT_PAGEABLE_SIZE, Order, PageRequest, Sort} from './spring-data.model';

describe('Spring Data', () => {

  describe('Sort', () => {
    it('should works with string property', () => {
      const sort = new Sort('property');
      expect(sort.orders.length).toBe(1);
      expect(sort.orders[0].property).toBe('property');
      expect(sort.orders[0].direction).toBe(DEFAULT_DIRECTION);
    });

    it('should works with string array properties', () => {
      const sort = new Sort(['property1', 'property2']);
      expect(sort.orders.length).toBe(2);
      expect(sort.orders[0].property).toBe('property1');
      expect(sort.orders[0].direction).toBe(DEFAULT_DIRECTION);
    });

    it('should works with order array properties', () => {
      const order: Order = {property: 'property', direction: 'DESC'};
      const sort = new Sort([order], 'DESC');
      expect(sort.orders.length).toBe(1);
      expect(sort.orders[0]).toBe(order);
    });
  });

  describe('PageRequest', () => {
    it('should works without param', () => {
      const pageRequest = new PageRequest();
      const httpParams = pageRequest.toHttpParams();
      expect(httpParams.toString()).toBe('page=0&size=25');
    });

    it('should works with default http param', () => {
      const pageRequest = new PageRequest(1, 50);
      const httpParams = pageRequest.toHttpParams({
        fromObject: {
          fakeParam: 'fakeValue'
        }
      });
      expect(httpParams).toBeDefined();
      expect(httpParams.has('fakeParam')).toBeTrue();
      expect(httpParams.toString()).toBe('fakeParam=fakeValue&page=1&size=50');
    });

    it('should works with sort param', () => {
      const pageRequest = new PageRequest(0, DEFAULT_PAGEABLE_SIZE, new Sort('sortProperty'));
      const httpParams = pageRequest.toHttpParams();
      expect(httpParams).toBeDefined();
      expect(httpParams.toString()).toBe('page=0&size=25&sort=sortProperty,ASC');
    });
  });
});
