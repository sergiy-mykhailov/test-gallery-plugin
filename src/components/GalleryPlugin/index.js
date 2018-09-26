
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, List, Card, Switch, Carousel, Select } from 'antd';

const Option = Select.Option;

class GalleryPlugin extends Component {
  static defaultProps = {
    feed: null,
    search: true,
    pagination: true,
    'results-per-page': 10,
    sorting: true,
    'auto-rotate-time': 4,
  };

  static propTypes = {
    feed: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    search: PropTypes.bool,
    pagination: PropTypes.bool,
    'results-per-page': PropTypes.number,
    sorting: PropTypes.bool,
    'auto-rotate-time': PropTypes.number,
  };

  constructor (props) {
    super(props);

    const data = (Array.isArray(props.feed)) ? props.feed : [];

    this.state = {
      pageSize: props['results-per-page'],
      speed: props['auto-rotate-time'],
      slideshow: false,
      data,
    };
  }

  componentDidMount() {
    const { feed } = this.props;

    if (typeof feed === 'string') {
      this.getData(feed)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.feed === 'string' && nextProps.feed !== this.props.feed) {
      this.getData(nextProps.feed)
    } else if (Array.isArray(nextProps.feed)) {
      this.setState({
        data: nextProps.feed,
      });
    }
  }

  getData = async (feed) => {
    const data = await fetch(feed).then(async (response) => {
      if (!response.ok) {
        console.error('Can not get feed:', response.statusText);
        return [];
      }

      return await response.json().then((responseData) => responseData);
    }).catch((err) => {
      console.error('Can not get feed:', err.message);
      return [];
    });

    this.setState({
      data
    });
  };

  handleSlideshowChange = (slideshow) => {
    this.setState({
      slideshow
    });
  };

  handlePageSizeChange = (pageSize) => {
    this.setState({
      pageSize
    });
  };

  renderListItem = (item) => {
    return (
      <List.Item>
        <Card
          bodyStyle={{ padding: 0 }}
          cover={<img alt="" src={item} />}
        />
      </List.Item>
    );
  };

  renderGrid = (data) => {
    const { pageSize } = this.state;

    return (
      <List
        grid={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 8 }}
        dataSource={data}
        renderItem={this.renderListItem}
        pagination={{
          pageSize,
        }}
      />
    );
  };

  renderSlideshow = (data) => {
    const { speed } = this.state;

    return (
      <div>
        <Carousel
          autoplay
          autoplaySpeed={speed * 1000}
          pauseOnHover={false}
        >
          {data.map((item, i) => (
            <Card
              key={i}
              bodyStyle={{ padding: 0 }}
              cover={<img alt="" src={item} />}
            />
          ))}
        </Carousel>,
      </div>
    );
  };

  render() {
    const { slideshow, data } = this.state;

    return (
      <div>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={3}>
                <Switch onChange={this.handleSlideshowChange} /> Slideshow
              </Col>
              <Col span={3}>
                <Select defaultValue={10} style={{ width: 120 }} onChange={this.handlePageSizeChange}>
                  <Option value={5}>5 per page</Option>
                  <Option value={10}>10 per page</Option>
                  <Option value={15}>15 per page</Option>
                  <Option value={20}>20 per page</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            {slideshow ? this.renderSlideshow(data) : this.renderGrid(data)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default GalleryPlugin;