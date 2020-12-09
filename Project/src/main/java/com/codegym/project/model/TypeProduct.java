package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    private Date dateAdd = new Date();

    private Date dateUpdate=new Date();

    private Date dateDelete;

    private boolean delete = false;

    @OneToMany(mappedBy = "typeProduct")
    @JsonIgnore
    private Set<Product> products;

    public void setDateDelete(Date dateDelete) {
        this.dateDelete = dateDelete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDateUpdate(Date dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
}
