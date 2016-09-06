var React = require("-aek/react");
var Container = require("-components/container");
var Page = require("-components/page");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var {Grid,Row,Col} = require("-components/grid");
var $ = require("jquery");
var newsData;

var NewsPage = React.createClass({

  componentDidMount: function() {
    this.getNews();
  },

  onRSSGet: function (data) {
    newsData = data.getElementsByTagName("item");
    this.forceUpdate();
  },

  getNews: function() {
    var RSS = "http://www.essex.ac.uk/news/newsfeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  render:function() {
    var loading = !newsData;

    if (!loading) {
      var stories, story;
      stories = [];

      for (var i = 0; i < newsData.length; i++) {
        story = {title: newsData[i].getElementsByTagName("title")[0].innerHTML,
         description: newsData[i].getElementsByTagName("description")[0].innerHTML,
          link: newsData[i].getElementsByTagName("link")[0].innerHTML,
          date: newsData[i].getElementsByTagName("pubDate")[0].innerHTML};
        stories.push(story);
      }

      return (
        <Page>
          <BasicSegment>
            <Listview formatted items={stories} itemFactory={(news)=>{
              return (
                <Item href={news.link}>
                    <Grid>
                      <Row>
                        <Col className="one wide column">
                          <i className="newspaper icon"/>
                        </Col>
                        <Col className="ten wide column">
                          {news.title}
                        </Col>
                        <Col className="five wide column">
                          {news.date.substring(0,16)}
                        </Col>
                      </Row>
                    </Grid>
                </Item>
              );
            }}/>;
          </BasicSegment>
        </Page>
      );
    } else {
      return (
        <Container>
          <VBox>
            <BasicSegment>
              <Segment>
                <h4>Sorry we are unable to find any news, please check back at a later date.</h4>
              </Segment>
            </BasicSegment>
          </VBox>
        </Container>
      );
    }
  }
});

module.exports = NewsPage;
