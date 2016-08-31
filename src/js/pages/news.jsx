var React = require("-aek/react");
var Container = require("-components/container");
var Page = require("-components/page");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var {Grid,Row,Col} = require("-components/grid");
var $ = require("jquery");
var newsData, hey;

var NewsPage = React.createClass({

  componentDidMount: function() {
    this.getNews();
  },

  getNews: function() {
    var RSS = "http://www.essex.ac.uk/news/newsfeed.xml";
    $.get(RSS, function (data) {
      console.log("function");
      console.log(data.responseXML);
      //console.log(data.getElementsByTagName("item")[0].childNodes[0].nodeValue);
      newsData = data.getElementsByTagName("item");
      hey = data.responseXML;
    });
  },

  render:function() {
    var loading = !newsData;
    console.log("here");
    console.log(loading);
    console.log(hey);

    if (!loading) {
      var stories, story;
      stories = [];
      console.log("no more loading");
      console.log(newsData);
      console.log(newsData[0]);
      console.log(newsData[0].getElementsByTagName("title")[0].innerHTML);

      for (var i = 0; i < newsData.length; i++) {
        story = {title: newsData[i].getElementsByTagName("title")[0].innerHTML,
         description: newsData[i].getElementsByTagName("description")[0].innerHTML,
          link: newsData[i].getElementsByTagName("link")[0].innerHTML,
          date: newsData[i].getElementsByTagName("pubDate")[0].innerHTML};
        stories.push(story);
      }
      console.log(stories);

      return (
        <Page>
          <VBox>
            <BasicSegment>
              <Listview formatted items={stories} itemFactory={(news)=>{
                //console.log(news);
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
          </VBox>
        </Page>
      );
    }
    return (
      <Container>
        <VBox>
          <BasicSegment>
            <p>no</p>
          </BasicSegment>
        </VBox>
      </Container>
    );
  }

});

module.exports = NewsPage;
