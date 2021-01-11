package com.codegym.project.service;

import com.codegym.project.model.Blog;

import java.util.List;

public interface BlogService extends BaseService<Blog> {
    List<Blog> findAllBlogDeleted();
    Blog findBlogDeleted(long id);
    boolean deleteBlog(long id);
    boolean undoBlog(long id);

    List<Blog> listFourNewBlogs(Long sl);
}
