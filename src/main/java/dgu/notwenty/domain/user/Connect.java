package dgu.notwenty.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Connect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long connectId;

    @ManyToOne
    @JoinColumn(name = "workerId", nullable = false)
    private User worker;

    @ManyToOne
    @JoinColumn(name = "subjectId", nullable = false)
    private User subject;
}
