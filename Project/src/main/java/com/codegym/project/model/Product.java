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
@Table(name = "products")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Long price;

    @NotNull
    private String image;

    @NotNull
    private String description;

    @NotNull
    private Long weight;

    @NotNull
    private Long size;

    private String color;

    @NotNull
    private Date dateAdd = new Date();

    private Date dateUpdate=new Date();

    private Date dateDelete;

    @NotNull
    private Long amount;

    private boolean delete = false;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "typeProduct_id")
    private TypeProduct typeProduct;

    public void setDateDelete(Date dateDelete) {
        this.dateDelete = dateDelete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public TypeProduct getTypeProduct() {
        return typeProduct;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDateUpdate(Date dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
}
