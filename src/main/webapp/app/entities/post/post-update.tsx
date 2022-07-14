import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoard } from 'app/shared/model/board.model';
import { getEntities as getBoards } from 'app/entities/board/board.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';

export const PostUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const boards = useAppSelector(state => state.board.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);
  const handleClose = () => {
    props.history.push('/post' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getBoards({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...postEntity,
      ...values,
      board: boards.find(it => it.id.toString() === values.board.toString()),
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
          ...postEntity,
          createdAt: convertDateTimeFromServer(postEntity.createdAt),
          board: postEntity?.board?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="freeBoardApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="freeBoardApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
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
                  id="post-id"
                  label={translate('freeBoardApp.post.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('freeBoardApp.post.title')}
                id="post-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('freeBoardApp.post.contents')}
                id="post-contents"
                name="contents"
                data-cy="contents"
                type="textarea"
              />
              <ValidatedField
                label={translate('freeBoardApp.post.readCnt')}
                id="post-readCnt"
                name="readCnt"
                data-cy="readCnt"
                type="text"
              />
              <ValidatedField
                label={translate('freeBoardApp.post.goodCnt')}
                id="post-goodCnt"
                name="goodCnt"
                data-cy="goodCnt"
                type="text"
              />
              <ValidatedField
                label={translate('freeBoardApp.post.createdAt')}
                id="post-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('freeBoardApp.post.createdBy')}
                id="post-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField id="post-board" name="board" data-cy="board" label={translate('freeBoardApp.post.board')} type="select">
                <option value="" key="0" />
                {boards
                  ? boards.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/post" replace color="info">
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

export default PostUpdate;
