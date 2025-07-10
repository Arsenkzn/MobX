import { Dispatch, SetStateAction } from "react";
import { GroupContactsDto } from "./dto/GroupContactsDto";
import { FormikConfig } from "formik";
import { ContactDto } from "./dto/ContactDto";

export type State<TState> = [TState, Dispatch<SetStateAction<TState>>];

export interface ContactsState {
  all: ContactDto[];
  filtered: ContactDto[];
  favorites: string[];
  loading: boolean;
  error: string;
  currentGroupId: GroupContactsDto | undefined;
}
export interface GroupContactsCardProps {
  groupContacts: GroupContactsDto;
  withLink?: boolean;
}

export interface FilterFormValues {
  name: string;
  groupId: string;
}

export interface FilterFormProps
  extends FormikConfig<Partial<FilterFormValues>> {
  groupContactsList: GroupContactsDto[];
}

export interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export interface BreadcrumbsProps {
  pathNames: string[];
}
