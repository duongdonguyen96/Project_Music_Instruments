package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
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
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateAdd = ZonedDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateUpdate = ZonedDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateDelete;

    @NotNull
    private Long amount;

    private boolean delete = false;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "typeProduct_id")
    private TypeProduct typeProduct;

    public void setDateDelete(ZonedDateTime dateDelete) {
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

    public void setDateUpdate(ZonedDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
}
