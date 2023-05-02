export const getResultPaginate = async ({
  Model,
  query,
  sort,
  page,
  limit,
  populate,
}) => {
  const totalPromises = Model.countDocuments();

  const contentPromises = Model.find(query)
    .populate(populate)
    .sort(sort)
    .skip(page * limit)
    .limit(limit);

  const [total, content] = await Promise.all([totalPromises, contentPromises]);
  const totalPages = Math.ceil(total / limit);

  page = +page;

  return {
    content,
    totalPages,
    total,
    page,
    first: page === 0,
    last: page === totalPages - 1,
    hasNextPage: page < totalPages - 1,
    hasPreviousPage: page > 0,
    nextPage: page + 1,
  };
};

const paginationService = { getResultPaginate };

export default paginationService;
