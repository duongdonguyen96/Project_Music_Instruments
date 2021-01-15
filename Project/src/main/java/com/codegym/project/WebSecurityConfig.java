package com.codegym.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;
    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        //check login
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("SELECT user_name, password,enable FROM users WHERE user_name = ?;")
                .authoritiesByUsernameQuery("SELECT user_name,concat('ROLE_',role) as roles FROM users WHERE user_name = ?;");

        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("SELECT user_name, password,enable FROM employees WHERE user_name = ?;")
                .authoritiesByUsernameQuery("SELECT user_name,concat('ROLE_',role) as roles FROM employees WHERE user_name = ?;")
                .passwordEncoder(encoder());
    }
//

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/**").permitAll()
                .and()
                .authorizeRequests().antMatchers("/charts","/products","/typeProducts","/vendors","/rates","/banners","/blogs","/employees","/users").hasAnyRole("ADMIN","EMPLOYEE")
                .and()
                .authorizeRequests().antMatchers("/productDeleted","/typeProductsDeleted","/vendorsDeleted","/ratesDeleted","/bannersDeleted","/blogsDeleted","/employeesDelete","/usersDelete").hasAnyRole("ADMIN","EMPLOYEE")
                .and()
                .authorizeRequests().antMatchers("/blogadd","/blogedit/**").hasAnyRole("ADMIN")
                .and()
                .formLogin().loginPage("/login")
                .defaultSuccessUrl("/default")
                .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/login");
        http.csrf().disable();
    }

}