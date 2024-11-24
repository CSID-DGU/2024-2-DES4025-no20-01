package dgu.notwenty.domain.auth.dto;

import dgu.notwenty.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
@Builder
@Getter
public class AuthSessionDTO implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> null);
    }

    @Override
    public String getUsername() { return user.getEmail(); } // 고유성을 위해 name대신 email

    @Override
    public String getPassword() { return null; }

}
