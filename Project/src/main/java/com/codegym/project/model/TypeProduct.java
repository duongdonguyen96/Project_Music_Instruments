package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause ="delete=false")
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateAdd = ZonedDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateUpdate = ZonedDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateDelete;

    private boolean delete = false;

    @OneToMany(mappedBy = "typeProduct")
    @JsonIgnore
    private Set<Product> products;

    public void setDateDelete(ZonedDateTime dateDelete) {
        this.dateDelete = dateDelete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDateUpdate(ZonedDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
}
