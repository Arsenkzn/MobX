import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApiSlice = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1" }),
  endpoints(builder) {
    return {
      getGroups: builder.query<GroupContactsDto[], void>({
        query: () => ({ url: "/c02f865d-1ef8-467f-bdd5-8a1234e167d5" }),
      }),
    };
  },
});

export const { useGetGroupsQuery } = groupApiSlice;
