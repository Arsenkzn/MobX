import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm } from "src/components/FilterForm";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { FilterFormValues } from "src/types/common";
import { ContactDto } from "src/types/dto/ContactDto";
import {
  filterByCurrentGroupId,
  getContactByName,
  setCurrentGroupId,
  unsetCurrentGroupId,
  useGetContactsQuery,
} from "src/store/reducers/contacts";
import { useGetGroupsQuery } from "src/store/reducers/group-reducer";

export const ContactListPage = memo(() => {
  const { isLoading, error } = useGetContactsQuery();
  const { filtered } = useAppSelector((state) => state.contacts);
  const { data: groups } = useGetGroupsQuery();
  const dispatch = useAppDispatch();


  const onSubmit = (fv: Partial<FilterFormValues>) => {
    
    if (fv.name) {
      const fvName = fv.name?.toLowerCase() || "";
      dispatch(getContactByName(fvName));
    } else dispatch(unsetCurrentGroupId());
    if (fv.groupId && fv.groupId !== "Open this select menu") {
      const currentGroupContacts = groups?.find(({ id }) => id === fv.groupId);
      if (currentGroupContacts) {
        dispatch(setCurrentGroupId(currentGroupContacts));
        dispatch(filterByCurrentGroupId());
      } else {
        dispatch(unsetCurrentGroupId());
      }
    }
  };

  return (
    <>
      {!isLoading ? (
        !error ? (
          <Row xxl={1}>
            <FilterForm
              groupContactsList={groups || []}
              initialValues={{}}
              onSubmit={onSubmit}
            />
            <Row
              xxs={1}
              xs={1}
              sm={1}
              md={2}
              lg={4}
              xl={4}
              xxl={4}
              className="g-4"
            >
              {filtered.map((contact: ContactDto) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Row>
        ) : (
          `Error: ${error}`
        )
      ) : (
        "loading"
      )}
    </>
  );
});
