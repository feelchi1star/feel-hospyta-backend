import { IsOptional, IsString } from 'class-validator';

/**
 * API features class to handle filtering, sorting, limiting fields, and pagination.
 *
 * @author Felix Chinonso Emmanuel
 * @link [GitHub Profile](https://github.com/feelchi1star)
 * @template T - The type of the document being queried.
 */
class APIFeatures {
  private query: any; // The Mongoose query object
  private queryString: any; // The query string parameters

  /**
   * Constructs an instance of APIFeatures.
   *
   * @param query - The Mongoose query object.
   * @param queryString - The query string parameters from the request.
   */
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filters the query based on the query string parameters.
   *
   * @returns {this} - The current instance for method chaining.
   */
  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  /**
   * Sorts the query results based on the query string parameters.
   *
   * @returns {this} - The current instance for method chaining.
   */
  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Limits the fields returned in the query results.
   *
   * @returns {this} - The current instance for method chaining.
   */
  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  /**
   * Paginates the query results based on the query string parameters.
   *
   * @returns {this} - The current instance for method chaining.
   */
  paginate(): this {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  getQuery() {
    return this.query;
  }
}

export class BaseQueryApiFeaturesDTO {
  @IsString()
  @IsOptional()
  page: number;
  @IsString()
  @IsOptional()
  sort: string;
  @IsString()
  @IsOptional()
  limit: string;
  @IsString()
  @IsOptional()
  fields: string;
}

export default APIFeatures;
