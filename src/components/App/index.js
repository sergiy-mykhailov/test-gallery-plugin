
import React, { Component } from 'react';
import { Col, Layout, Row } from 'antd';
import GalleryPlugin from  '../GalleryPlugin';
import './styles.css';
import testData from  './test-data.json';


// const testData = '../App/test-data.json';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="app-header">
            Gallery plugin example
          </Header>

          <Content>
            <Row>
              <Col span={24}>
                <GalleryPlugin feed={testData} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
