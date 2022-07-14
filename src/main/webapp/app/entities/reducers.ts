import board from 'app/entities/board/board.reducer';
import post from 'app/entities/post/post.reducer';
import comment from 'app/entities/comment/comment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  board,
  post,
  comment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
