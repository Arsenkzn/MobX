import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { contactStore } from "src/store-mobx/contactsStore";

export const FavoritListPage = memo(() => {

  const favoritesContacts = contactStore.all.filter(({ id }) => contactStore.favorites.includes(id));

  return (
    <Row xxl={4} className="g-4">
      {favoritesContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
