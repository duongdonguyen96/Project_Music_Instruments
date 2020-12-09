package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "vendors")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private String phone;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String image;

    @NotNull
    private String surrogate;

    @NotNull
    private Date dateAdd = new Date();

    private Date dateUpdate=new Date();

    private Date dateDelete;

    private boolean delete=false;

    @OneToMany(mappedBy = "vendor")
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
}
