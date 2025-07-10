import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { useGetGroupsQuery } from "src/store/reducers/group-reducer";

export const GroupListPage = memo(() => {
  const { data: groups } = useGetGroupsQuery();
  return (
    <Row xxl={4}>
      {groups?.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
