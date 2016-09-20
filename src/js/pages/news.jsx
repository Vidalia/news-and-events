var React = require("-aek/react");
var Container = require("-components/container");
var Page = require("-components/page");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var {Grid,Row,Col} = require("-components/grid");
var $ = require("jquery");
var newsData, paddingNeeded;

//TODO: Create a loading screen that will pop up to cover the twig code. or at least check whether or not there issomething takign ages to load here causing the render to be delayed.
//Only do the above if this is the first page you come to when you are not a student.

var NewsPage = React.createClass({

  //Setting the initial state of essential variables and running crucial functions needed for functionality.
  getInitialState: function() {
    this.getNews();
    return {};
  },

  //Once the screeen has been successfully rendered gather the height and determine padding needed.
  componentDidMount: function() {
    paddingNeeded = document.getElementById('header').clientHeight + document.getElementById('menu').clientHeight;
    paddingNeeded = { paddingBottom: + paddingNeeded + "px"};
  },

  //Parse the event feed into the onRSSGet function in order to gather the event data.
  getNews: function() {
    var RSS = "http://www.essex.ac.uk/news/newsfeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  onRSSGet: function (data) {
    newsData = data.getElementsByTagName("item");
    this.forceUpdate();
  },

  render:function() {
    var loading = !newsData;

    if (!loading) {
      var stories, story;
      stories = [];

      //Create an array of all stories with the needed data.
      for (var i = 0; i < newsData.length; i++) {
        story = {title: newsData[i].getElementsByTagName("title")[0].innerHTML,
         description: newsData[i].getElementsByTagName("description")[0].innerHTML,
          link: newsData[i].getElementsByTagName("link")[0].innerHTML,
          date: newsData[i].getElementsByTagName("pubDate")[0].innerHTML};
        stories.push(story);
      }

      return (
        <Page style={paddingNeeded}>
          <BasicSegment>
            <Listview formatted items={stories} itemFactory={(news)=>{
              return (
                <Item href={news.link}>
                    <Grid>
                      <Row>
                        <Col className="one wide column">
                          <i className="newspaper icon"/>
                        </Col>
                        <Col id="newsTitle" className="ten wide column">
                          {news.title}
                        </Col>
                        <Col id="publishDate" className="five wide column">
                          {news.date.substring(0,16)}
                        </Col>
                      </Row>
                    </Grid>
                </Item>
              );
            }}/>
          </BasicSegment>
        </Page>
      );
    } else {
      return (
        <Container>
          <VBox>
            <BasicSegment>
              <Segment>
                <h4 id="warning">Sorry we are unable to find any news, please check back at a later date.</h4>
              </Segment>
            </BasicSegment>
          </VBox>
        </Container>
      );
    }
  }
});

module.exports = NewsPage;
