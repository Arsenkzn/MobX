import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { ContactsState } from "src/types/common";

const initialState: ContactsState = {
  all: [],
  filtered: [],
  favorites: [],
  loading: false,
  error: "",
  currentGroupId: undefined,
};

export const contactApiSlice = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1" }),
  endpoints(builder) {
    return {
      getContacts: builder.query<ContactDto[], void>({
        query: () => ({ url: "/721dbb16-7c6f-460a-a9f7-041b6127f8f0" }),
      }),
    };
  },
});

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    loadContactsRequest(state) {
      state.loading = true;
      state.error = "";
    },
    loadContactsSuccess(state, action: PayloadAction<ContactDto[]>) {
      state.all = action.payload;
      state.filtered = action.payload;
      state.loading = false;
    },
    loadContactsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setFavoritesContacts(state) {
      state.favorites = state.all.slice(0, 4).map((contact) => contact.id);
    },
    setCurrentGroupId(state, action: PayloadAction<GroupContactsDto>) {
      state.currentGroupId = action.payload;
    },
    unsetCurrentGroupId(state) {
      state.filtered = state.all;
      state.currentGroupId = undefined;
    },
    filterByCurrentGroupId(state) {
      if (state.currentGroupId) {
        state.filtered = state.filtered.filter(({ id }) =>
          state.currentGroupId?.contactIds.includes(id)
        );
      }
    },
    getContactByName(state, action: PayloadAction<string>) {
      const searchName = action.payload.toLowerCase();
      state.filtered = state.all.filter((contact) =>
        contact.name.toLowerCase().includes(searchName)
      );
    },
  },
});

export const {
  loadContactsRequest,
  loadContactsSuccess,
  loadContactsFailure,
  setFavoritesContacts,
  setCurrentGroupId,
  unsetCurrentGroupId,
  filterByCurrentGroupId,
  getContactByName,
} = contactsSlice.actions;

export const { useGetContactsQuery } = contactApiSlice;
