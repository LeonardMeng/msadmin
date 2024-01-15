package org.mengsoft.msadmin.service;

import org.mengsoft.msadmin.entity.Menu;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author menglingjun
* @description 针对表【menu】的数据库操作Service
* @createDate 2024-01-15 11:00:53
*/
public interface MenuService extends IService<Menu> {

    List<Menu> buildTreeMenu(List<Menu> sysMenuList);
}
