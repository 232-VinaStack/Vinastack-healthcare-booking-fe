import { Breadcrumb, Layout as LayoutAnt, theme } from 'antd';
import PropTypes from 'prop-types';
import HeaderAuth from './HeaderAuth';
import LogoImg from './../assets/logo.jpg';
const { Header, Content, Footer } = LayoutAnt;

const Layout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutAnt>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="demo-logo"
          style={{ alignSelf: 'center', display: 'flex' }}
        >
          <img src={LogoImg} alt="abc" style={{ width: 50, height: 50 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, color: 'white', textAlign:'left', paddingLeft:10 }}>
          Doctor Online Management Booking
        </div>

        <HeaderAuth />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Chọn triệu chứng</Breadcrumb.Item>
          <Breadcrumb.Item>Chọn bác sĩ</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by VinaStack
      </Footer>
    </LayoutAnt>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
