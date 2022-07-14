import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comment.reducer';

export const CommentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const commentEntity = useAppSelector(state => state.comment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentDetailsHeading">
          <Translate contentKey="freeBoardApp.comment.detail.title">Comment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="freeBoardApp.comment.id">Id</Translate>
            </span>
          </dt>
          <dd>{commentEntity.id}</dd>
          <dt>
            <span id="depth">
              <Translate contentKey="freeBoardApp.comment.depth">Depth</Translate>
            </span>
          </dt>
          <dd>{commentEntity.depth}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="freeBoardApp.comment.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{commentEntity.comment}</dd>
          <dt>
            <span id="readCnt">
              <Translate contentKey="freeBoardApp.comment.readCnt">Read Cnt</Translate>
            </span>
          </dt>
          <dd>{commentEntity.readCnt}</dd>
          <dt>
            <span id="goodCnt">
              <Translate contentKey="freeBoardApp.comment.goodCnt">Good Cnt</Translate>
            </span>
          </dt>
          <dd>{commentEntity.goodCnt}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="freeBoardApp.comment.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{commentEntity.createdAt ? <TextFormat value={commentEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="freeBoardApp.comment.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{commentEntity.createdBy}</dd>
          <dt>
            <Translate contentKey="freeBoardApp.comment.post">Post</Translate>
          </dt>
          <dd>{commentEntity.post ? commentEntity.post.id : ''}</dd>
          <dt>
            <Translate contentKey="freeBoardApp.comment.parent">Parent</Translate>
          </dt>
          <dd>{commentEntity.parent ? commentEntity.parent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment/${commentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentDetail;
