import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { USER_ROUTES } from "../routes";
import { PaginatedRequestParams } from "@repo/validators/api";
import { User } from "@repo/validators/schema/user";
import { PaginatedResponse } from "@repo/utils/api";

const getUser = {
  useInfiniteQuery: (params: PaginatedRequestParams) => {
    const queryData = useInfiniteQuery({
      queryKey: ["user"],
      initialPageParam: 1,
      queryFn: async () => {
        const response = await fetcher<
          PaginatedRequestParams,
          PaginatedResponse<User>
        >({
          params,
          url: USER_ROUTES.LIST,
        });

        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

    return queryData;
  },
};

export const userService = { getUser };
