import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "@/types/user";
import { API } from "@/utils/constants/url";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API.USERS }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => "/",
      transformResponse: (response: IUser[]) => {
        return response.map((user) => ({
          ...user,
          picture: `${API.IMAGES}/id/${user.id}/256/256`,
        }));
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
