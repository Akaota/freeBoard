import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './board.reducer';

export const BoardDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const boardEntity = useAppSelector(state => state.board.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boardDetailsHeading">
          <Translate contentKey="freeBoardApp.board.detail.title">Board</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="freeBoardApp.board.id">Id</Translate>
            </span>
          </dt>
          <dd>{boardEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="freeBoardApp.board.title">Title</Translate>
            </span>
          </dt>
          <dd>{boardEntity.title}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="freeBoardApp.board.category">Category</Translate>
            </span>
          </dt>
          <dd>{boardEntity.category}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="freeBoardApp.board.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{boardEntity.createdAt ? <TextFormat value={boardEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="freeBoardApp.board.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{boardEntity.createdBy}</dd>
        </dl>
        <Button tag={Link} to="/board" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/board/${boardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoardDetail;
