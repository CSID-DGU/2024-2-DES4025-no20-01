package dgu.notwenty.domain.supply.entity;

import dgu.notwenty.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Supply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workerId")
    private User worker;

    @ManyToOne
    @JoinColumn(name = "subjectId", nullable = false)
    private User subject;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String quantity;

    @Column(nullable = false)
    private String quality;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDate uploadDate;

    @Column(nullable = false)
    private LocalDate expirationDate;
}