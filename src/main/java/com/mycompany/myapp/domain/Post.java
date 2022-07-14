package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "contents")
    private String contents;

    @Column(name = "read_cnt")
    private Integer readCnt;

    @Column(name = "good_cnt")
    private Integer goodCnt;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @NotNull
    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @ManyToOne
    @JsonIgnoreProperties(value = { "posts" }, allowSetters = true)
    private Board board;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Post id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Post title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return this.contents;
    }

    public Post contents(String contents) {
        this.setContents(contents);
        return this;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Integer getReadCnt() {
        return this.readCnt;
    }

    public Post readCnt(Integer readCnt) {
        this.setReadCnt(readCnt);
        return this;
    }

    public void setReadCnt(Integer readCnt) {
        this.readCnt = readCnt;
    }

    public Integer getGoodCnt() {
        return this.goodCnt;
    }

    public Post goodCnt(Integer goodCnt) {
        this.setGoodCnt(goodCnt);
        return this;
    }

    public void setGoodCnt(Integer goodCnt) {
        this.goodCnt = goodCnt;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Post createdAt(ZonedDateTime createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public Post createdBy(Long createdBy) {
        this.setCreatedBy(createdBy);
        return this;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Board getBoard() {
        return this.board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Post board(Board board) {
        this.setBoard(board);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", contents='" + getContents() + "'" +
            ", readCnt=" + getReadCnt() +
            ", goodCnt=" + getGoodCnt() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", createdBy=" + getCreatedBy() +
            "}";
    }
}
