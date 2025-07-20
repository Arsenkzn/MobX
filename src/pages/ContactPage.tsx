import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { contactStore } from "src/store-mobx/contactsStore";

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();

  const contact = contactId && contactStore.getContactById(contactId);

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
