package com.codegym.project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "rates")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String content;

    private String status="Chưa đọc";

    @NotNull
    private Date dateAdd = new Date();

    private Date dateDelete;

    private boolean delete = false;

    public void setDateDelete(Date dateDelete) {
        this.dateDelete = dateDelete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
