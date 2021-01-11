package com.codegym.project.service.Impl;

import com.codegym.project.model.Blog;
import com.codegym.project.repository.BlogRepository;
import com.codegym.project.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    public BlogRepository blogRepository;
    @Override
    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog findById(long id) throws SQLException {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public Blog save(Blog blog) throws SQLException {
        if (blog.getId() != null){
            blog.setDateUpdate(LocalDateTime.now());
            blog.setDateAdd(this.findById(blog.getId()).getDateAdd());
            blogRepository.save(blog);
        }
        return blogRepository.save(blog);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Blog blog = this.findById(id);
        if (blog == null){
            return false;
        }
        blog.setDateDelete(LocalDateTime.now());
        blog.setDelete(true);
        blogRepository.save(blog);
        return true;
    }

    @Override
    public List<Blog> findAllBlogDeleted() {
        return blogRepository.findAllBlogDeleted();
    }

    @Override
    public Blog findBlogDeleted(long id) {
        Blog blog = null;
        blog = blogRepository.findBlogDeleted(id);
        return blog;
    }

    @Override
    public boolean deleteBlog(long id) {
        Blog blog = this.findBlogDeleted(id);
        if (blog != null){
            blogRepository.delete(blog);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoBlog(long id) {
        Blog blog = this.findBlogDeleted(id);
        if (blog != null){
            blog.setDelete(false);
            blog.setDateDelete(LocalDateTime.now());
            blogRepository.save(blog);
            return true;
        }
        return false;
    }

    @Override
    public List<Blog> listFourNewBlogs(Long sl) {
        return blogRepository.listFourNewBlogs(sl);
    }
}
