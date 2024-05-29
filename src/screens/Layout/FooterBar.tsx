import { Button, Drawer, Typography } from "antd";
import { AppContext } from "../../components/Context";
import React, { useContext, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useColor } from "../../components/color";

const { Text, Link } = Typography;

const FooterBar = () => {
  const [open, setOpen] = useState(false);
  const { isDark } = useContext(AppContext);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const BACKGROUND = isDark ? useColor.BGCOLOR_DARK : useColor.BGCOLOR_WHITE;
  const BACKGROUND_FB = isDark ? useColor.BGCOLOR_DARK_FB : useColor.BGCOLOR_WHITE;
  const COLOR = isDark ? useColor.COLOR_WHITE : useColor.COLOR_DARK;

  return (
    <div style={{ textAlign: "center", backgroundColor: BACKGROUND.backgroundColor }}>
      <MdOutlineKeyboardArrowUp
        onClick={showDrawer}
        style={{ width: "25px", height: "25px", color: COLOR.color }}
      />
      <Drawer
        placement="bottom"
        onClose={onClose}
        closable={false}
        open={open}
        style={{ textAlign: "center", backgroundColor: BACKGROUND_FB.backgroundColor }}
        height={120}
      >
        <Text strong style={{ color: COLOR.color}}>Contact: +261 89 536 34</Text>
        <div>
          <Link 
            href="https://mada-creative-agency.com/" 
            target="_blank" 
            style={{ color: COLOR.color}}>
            https://mada-creative-agency.com/
          </Link>
        </div>
        <div>
          <Link
            href="https://www.facebook.com/MadaCreativeAgency/"
            target="_blank"
            style={{ color: COLOR.color}}
          >
            https://www.facebook.com/MadaCreativeAgency/
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default FooterBar;
