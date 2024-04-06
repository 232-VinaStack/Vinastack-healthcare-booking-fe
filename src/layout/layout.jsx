import React from 'react';
import { Breadcrumb, Layout as LayoutAnt, Menu, theme } from 'antd';
import PropTypes from 'prop-types';
import HeaderAuth from './HeaderAuth';
const { Header, Content, Footer } = LayoutAnt;

const items = new Array(1).fill(null).map((_, index) => ({
  key: index + 1,
  label: `Doctor Online Management Booking`,
}));

const Layout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutAnt>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        
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
