package org.mengsoft.msadmin.common.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.mengsoft.msadmin.common.constant.JwtConstant;
import org.mengsoft.msadmin.common.utils.JwtUtils;
import org.mengsoft.msadmin.common.utils.StringUtil;
import org.mengsoft.msadmin.entity.CheckResult;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * @author java1234_小锋 （公众号：java1234）
 * @site www.java1234.vip
 * @company 南通小锋网络科技有限公司
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    @Autowired
    private UserService userService;

    @Autowired
    private MyUserDetailsServiceImpl myUserDetailsService;

    private static final String URL_WHITELIST[] ={
            "/login",
            "/logout",
            "/captcha",
            "/password",
            "/image/**"
    } ;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader("token");
        System.out.println("请求url:"+request.getRequestURI());
        // 如果token是空 或者 url在白名单里，则放行
        if(StringUtil.isEmpty(token) || new ArrayList<String>(Arrays.asList(URL_WHITELIST)).contains(request.getRequestURI())){
            chain.doFilter(request,response);
            return;
        }
        CheckResult checkResult = JwtUtils.validateJWT(token);
        if(!checkResult.isSuccess()){
            switch (checkResult.getErrCode()){
                case JwtConstant.JWT_ERRCODE_NULL:throw new JwtException("Token不存在");
                case JwtConstant.JWT_ERRCODE_FAIL:throw new JwtException("Token验证不通过");
                case JwtConstant.JWT_ERRCODE_EXPIRE:throw new JwtException("Token过期");
            }
        }
        Claims claims = JwtUtils.parseJWT(token);
        String username = claims.getSubject();
        User user = userService.getByUsername(username);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(username,null,myUserDetailsService.getUserAuthority(user.getId()));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        chain.doFilter(request,response);
    }
}
