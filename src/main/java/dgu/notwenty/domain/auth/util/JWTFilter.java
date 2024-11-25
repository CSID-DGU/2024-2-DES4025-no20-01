package dgu.notwenty.domain.auth.util;

import dgu.notwenty.domain.auth.converter.AuthConverter;
import dgu.notwenty.domain.auth.dto.AuthSessionDTO;
import dgu.notwenty.domain.user.converter.UserConverter;
import dgu.notwenty.domain.user.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final String[] allowedUrls;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        System.out.println(requestURI);

        // ALLOWED_URLS에 포함된 요청은 필터링 제외
        for (String url : allowedUrls) {
            if (requestURI.startsWith(url.replace("/*","").replace("*",""))) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        String authorization = request.getHeader("Authorization");

        if(authorization == null || !authorization.startsWith("Bearer ")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("유효하지 않은 토큰이거나, 토큰 정보가 없습니다.");
            return;
        }

        try {
            String token = authorization.split(" ")[1]; //Bearer 부분 제거 후 순수 토큰만 획득

            Long userId = jwtUtil.extractUserId(token);
            String email = jwtUtil.extractEmail(token);

            User user = UserConverter.toUserSession(userId, email);

            AuthSessionDTO authSessionDTO = AuthConverter.toAuthCustom(user);
            Authentication authToken = new UsernamePasswordAuthenticationToken(authSessionDTO, null, null);

            SecurityContextHolder.getContext().setAuthentication(authToken); //세션에 사용자 등록

        }catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("유효하지 않은 토큰입니다.");
            return;
        }

        filterChain.doFilter(request, response);
    }
}