package com.codegym.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = "banners")
@Where(clause = "delete=false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String image;

    @NotNull
    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateAdd = ZonedDateTime.now();

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime dateUpdate = ZonedDateTime.now();

    private Date dateDelete;

    private boolean delete = false;
}
