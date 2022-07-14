package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Comment} entity.
 */
public class CommentDTO implements Serializable {

    private Long id;

    private Integer depth;

    private String comment;

    private Integer readCnt;

    private Integer goodCnt;

    @NotNull
    private ZonedDateTime createdAt;

    @NotNull
    private Long createdBy;

    private PostDTO post;

    private CommentDTO parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDepth() {
        return depth;
    }

    public void setDepth(Integer depth) {
        this.depth = depth;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getReadCnt() {
        return readCnt;
    }

    public void setReadCnt(Integer readCnt) {
        this.readCnt = readCnt;
    }

    public Integer getGoodCnt() {
        return goodCnt;
    }

    public void setGoodCnt(Integer goodCnt) {
        this.goodCnt = goodCnt;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public PostDTO getPost() {
        return post;
    }

    public void setPost(PostDTO post) {
        this.post = post;
    }

    public CommentDTO getParent() {
        return parent;
    }

    public void setParent(CommentDTO parent) {
        this.parent = parent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommentDTO)) {
            return false;
        }

        CommentDTO commentDTO = (CommentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, commentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommentDTO{" +
            "id=" + getId() +
            ", depth=" + getDepth() +
            ", comment='" + getComment() + "'" +
            ", readCnt=" + getReadCnt() +
            ", goodCnt=" + getGoodCnt() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", createdBy=" + getCreatedBy() +
            ", post=" + getPost() +
            ", parent=" + getParent() +
            "}";
    }
}
