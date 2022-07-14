import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './post.reducer';

export const PostDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const postEntity = useAppSelector(state => state.post.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="postDetailsHeading">
          <Translate contentKey="freeBoardApp.post.detail.title">Post</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="freeBoardApp.post.id">Id</Translate>
            </span>
          </dt>
          <dd>{postEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="freeBoardApp.post.title">Title</Translate>
            </span>
          </dt>
          <dd>{postEntity.title}</dd>
          <dt>
            <span id="contents">
              <Translate contentKey="freeBoardApp.post.contents">Contents</Translate>
            </span>
          </dt>
          <dd>{postEntity.contents}</dd>
          <dt>
            <span id="readCnt">
              <Translate contentKey="freeBoardApp.post.readCnt">Read Cnt</Translate>
            </span>
          </dt>
          <dd>{postEntity.readCnt}</dd>
          <dt>
            <span id="goodCnt">
              <Translate contentKey="freeBoardApp.post.goodCnt">Good Cnt</Translate>
            </span>
          </dt>
          <dd>{postEntity.goodCnt}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="freeBoardApp.post.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{postEntity.createdAt ? <TextFormat value={postEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="freeBoardApp.post.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{postEntity.createdBy}</dd>
          <dt>
            <Translate contentKey="freeBoardApp.post.board">Board</Translate>
          </dt>
          <dd>{postEntity.board ? postEntity.board.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
