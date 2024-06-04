export const LIMIT = 10;

class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludeParams = ['sort', 'limit', 'page', 'fields'];
    excludeParams.forEach((param) => delete queryObj[param]);

    const queryStr = JSON.stringify(queryObj);
    queryObj = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    this.query = this.query.find(queryObj);

    return this;
  }

  paginate(page: number) {
    const skip = (page - 1) * LIMIT;

    this.query = this.query.skip(skip).limit(LIMIT);

    return this;
  }
}

export default APIFeatures;
