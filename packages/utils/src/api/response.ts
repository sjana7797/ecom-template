export type PaginatedResponseParams<T> = {
  data: T[];
  limit: number;
  cursor: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  nextCursor: number | null;
  page: number;
};

export const createPaginatedResponse = <T>(
  params: PaginatedResponseParams<T>
): PaginatedResponse<T> => {
  const { data, limit, cursor } = params;

  let slicedData = data;

  let nextCursor: number | null = null;

  if (data.length > limit) {
    nextCursor = cursor + 1;
    slicedData = data.slice(0, limit);
  }

  return {
    data: slicedData,
    nextCursor,
    page: cursor,
  };
};
