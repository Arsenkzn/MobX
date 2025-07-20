import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { groupsStore } from "src/store-mobx/groupsStore";
import { Col, Row } from "react-bootstrap";
import { contactStore } from "src/store-mobx/contactsStore";


export const GroupListPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const groupContacts = groupsStore.all.find(({ id }) => id === groupId);

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
              {contactStore.all.map((contact) => (
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