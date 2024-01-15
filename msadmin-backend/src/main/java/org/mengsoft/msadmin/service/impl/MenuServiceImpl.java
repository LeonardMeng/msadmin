package org.mengsoft.msadmin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.mengsoft.msadmin.entity.Menu;
import org.mengsoft.msadmin.service.MenuService;
import org.mengsoft.msadmin.mapper.MenuMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
* @author menglingjun
* @description 针对表【menu】的数据库操作Service实现
* @createDate 2024-01-15 11:00:53
*/
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu>
    implements MenuService{
    @Override
    public List<Menu> buildTreeMenu(List<Menu> sysMenuList) {
        List<Menu> resultMenuList=new ArrayList<>();

        for(Menu sysMenu:sysMenuList){

            // 寻找子节点
            for(Menu e:sysMenuList){
                if(e.getParentId()==sysMenu.getId()){
                    sysMenu.getChildren().add(e);
                }
            }

            if(sysMenu.getParentId()==0L){
                resultMenuList.add(sysMenu);
            }
        }

        return resultMenuList;
    }
}




