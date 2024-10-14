package dgu.notwenty.domain.work.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long outId;

    @ManyToOne
    @JoinColumn(name = "workId", nullable = false)
    private Work work;

    private String reason;

}
