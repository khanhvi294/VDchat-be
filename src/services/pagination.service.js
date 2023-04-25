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

  return {
    content,
    totalPages,
    page,
    first: page === 0,
    last: page === totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 0,
  };
};

const paginationService = { getResultPaginate };

export default paginationService;
