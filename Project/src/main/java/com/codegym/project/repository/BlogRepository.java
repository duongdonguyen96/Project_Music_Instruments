package com.codegym.project.repository;

import com.codegym.project.model.Blog;
import com.codegym.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query(
            value = "select * from blogs u where u.delete = true ",
            nativeQuery = true)
    List<Blog> findAllBlogDeleted();

    @Query(
            value = "select * from blogs where id=?1",
            nativeQuery = true)
    Blog findBlogDeleted(long id);

    @Query(
            value = "select * from blogs where delete=false order by date_add desc limit ?1",
            nativeQuery = true)
    List<Blog> listFourNewBlogs(Long sl);

}
