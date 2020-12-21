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
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
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
    @Pattern(regexp = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$",message = "Tên không phù hợp")
    private String name;

    @NotNull
    private String address;

    @NotNull
    @Pattern(regexp = "(09|01[2|6|8|9])+([0-9]{8})\\b",message = "Số điện thoại không đúng")
    private String phone;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String image;

    @NotNull
    private String surrogate;

    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateAdd =LocalDateTime.now() ;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateUpdate;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dateDelete ;

    private boolean delete=false;

    @OneToMany(mappedBy = "vendor")
    @JsonIgnore
    private Set<Product> products;

    public void setDateDelete(LocalDateTime dateDelete) {
        this.dateDelete = dateDelete;
    }
    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public boolean isDelete() {
        return delete;
    }

    public Long getId() {
        return id;
    }
    public void setDateUpdate(LocalDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }
}
