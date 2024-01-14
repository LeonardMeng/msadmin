package org.mengsoft.msadmin.common.security;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.java1234.entity.R;
import com.java1234.entity.SysMenu;
import com.java1234.entity.SysRole;
import com.java1234.entity.SysUser;
import com.java1234.service.SysMenuService;
import com.java1234.service.SysRoleService;
import com.java1234.service.SysUserService;
import com.java1234.util.JwtUtils;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 登录成功处理器
 * @author java1234_小锋 （公众号：java1234）
 * @site www.java1234.vip
 * @company 南通小锋网络科技有限公司
 */
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Autowired
    private SysRoleService sysRoleService;

    @Autowired
    private SysMenuService sysMenuService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        ServletOutputStream outputStream = httpServletResponse.getOutputStream();

        String username=authentication.getName();
        String token = JwtUtils.genJwtToken(username);

        SysUser currentUser = userService.getByUsername(username);

        // 根据用户id获取所有的角色信息
        List<SysRole> roleList = sysRoleService.list(new QueryWrapper<SysRole>().inSql("id", "SELECT role_id FROM sys_user_role WHERE user_id=" + currentUser.getId()));

        // 遍历所有的角色，获取所有菜单权限 而且不重复
        Set<SysMenu> menuSet=new HashSet<>();
        for(SysRole sysRole:roleList){
            List<SysMenu> sysMenuList = sysMenuService.list(new QueryWrapper<SysMenu>().inSql("id", "SELECT menu_id FROM sys_role_menu WHERE role_id=" + sysRole.getId()));
            for(SysMenu sysMenu:sysMenuList){
                menuSet.add(sysMenu);
            }
        }

        currentUser.setRoles(roleList.stream().map(SysRole::getName).collect(Collectors.joining(",")));

        List<SysMenu> sysMenuList=new ArrayList<>(menuSet);

        // 排序
        sysMenuList.sort(Comparator.comparing(SysMenu::getOrderNum));

        // 转菜单树
        List<SysMenu> menuList=sysMenuService.buildTreeMenu(sysMenuList);

        outputStream.write(JSONUtil.toJsonStr(R.ok("登录成功").put("authorization",token).put("currentUser",currentUser).put("menuList",menuList)).getBytes());
        outputStream.flush();
        outputStream.close();
    }
}
