package dgu.notwenty.domain.user.dto;

import dgu.notwenty.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class UserDetailsDTO implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> null);
    }

    @Override
    public String getUsername() { return user.getEmail(); }

    @Override
    public String getPassword() { return null; }
}
