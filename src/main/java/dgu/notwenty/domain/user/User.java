package dgu.notwenty.domain.user;

import dgu.notwenty.domain.work.Work;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userPosition;

    @Column(nullable = false)
    private String oauthId;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private LocalDateTime workStart;

    @Column(nullable = false)
    private LocalDateTime workEnd;

    @OneToMany(mappedBy = "user")
    private List<Work> workList;

    @OneToMany(mappedBy = "worker")
    private List<Connect> connectAsWorker;

    @OneToMany(mappedBy = "subject")
    private List<Connect> connectAsSubject;
}