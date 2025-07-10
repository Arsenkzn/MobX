import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { useGetContactsQuery } from "src/store/reducers/contacts";
import { useGetGroupsQuery } from "src/store/reducers/group-reducer";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: contacts } = useGetContactsQuery();
  const { data: groups } = useGetGroupsQuery();
  const groupContacts = groups?.find(({ id }) => id === groupId);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contacts?.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
