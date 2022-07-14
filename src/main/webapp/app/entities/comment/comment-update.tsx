import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { getEntity, updateEntity, createEntity, reset } from './comment.reducer';

export const CommentUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const comments = useAppSelector(state => state.comment.entities);
  const posts = useAppSelector(state => state.post.entities);
  const commentEntity = useAppSelector(state => state.comment.entity);
  const loading = useAppSelector(state => state.comment.loading);
  const updating = useAppSelector(state => state.comment.updating);
  const updateSuccess = useAppSelector(state => state.comment.updateSuccess);
  const handleClose = () => {
    props.history.push('/comment' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getComments({}));
    dispatch(getPosts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...commentEntity,
      ...values,
      parent: comments.find(it => it.id.toString() === values.parent.toString()),
      post: posts.find(it => it.id.toString() === values.post.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: displayDefaultDateTime(),
        }
      : {
          ...commentEntity,
          createdAt: convertDateTimeFromServer(commentEntity.createdAt),
          post: commentEntity?.post?.id,
          parent: commentEntity?.parent?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="freeBoardApp.comment.home.createOrEditLabel" data-cy="CommentCreateUpdateHeading">
            <Translate contentKey="freeBoardApp.comment.home.createOrEditLabel">Create or edit a Comment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="comment-id"
                  label={translate('freeBoardApp.comment.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('freeBoardApp.comment.depth')} id="comment-depth" name="depth" data-cy="depth" type="text" />
              <ValidatedField
                label={translate('freeBoardApp.comment.comment')}
                id="comment-comment"
                name="comment"
                data-cy="comment"
                type="text"
              />
              <ValidatedField
                label={translate('freeBoardApp.comment.readCnt')}
                id="comment-readCnt"
                name="readCnt"
                data-cy="readCnt"
                type="text"
              />
              <ValidatedField
                label={translate('freeBoardApp.comment.goodCnt')}
                id="comment-goodCnt"
                name="goodCnt"
                data-cy="goodCnt"
                type="text"
              />
              <ValidatedField
                label={translate('freeBoardApp.comment.createdAt')}
                id="comment-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('freeBoardApp.comment.createdBy')}
                id="comment-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField id="comment-post" name="post" data-cy="post" label={translate('freeBoardApp.comment.post')} type="select">
                <option value="" key="0" />
                {posts
                  ? posts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="comment-parent"
                name="parent"
                data-cy="parent"
                label={translate('freeBoardApp.comment.parent')}
                type="select"
              >
                <option value="" key="0" />
                {comments
                  ? comments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/comment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CommentUpdate;
