import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { useAppSelector } from "src/hooks/hooks";

export const FavoritListPage = memo(() => {
  const { all, favorites } = useAppSelector((state) => state.contacts);
  const favoritesContacts = all.filter(({ id }) => favorites.includes(id));

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
