package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;
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

    @NotBlank
    @Size(min = 10,max = 100,message = "Please enter at least 10 characters!")
    private String name;

    @NotNull
    @Min(value = 0,message = "The minimum price is 0")
    private Long price;

    @NotBlank
    private String image;

    @NotBlank
    @Size(min = 100,max = 500,message = "Please enter at least 10 characters!")
    private String description;

    @NotNull
    @Min(value = 0,message = "The minimum weight is 0")
    private Long weight;

    @NotNull
    @Min(value = 0,message = "The minimum size is 0")
    private Long size;

    private String color;

    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateAdd =LocalDateTime.now() ;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateUpdate;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateDelete ;

    @NotNull
    private Long amount;

    public Long getId() {
        return id;
    }

    private boolean delete = false;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "typeProduct_id")
    private TypeProduct typeProduct;

    public void setDateDelete(LocalDateTime dateDelete) {
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

    public void setDateUpdate(LocalDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }
}
