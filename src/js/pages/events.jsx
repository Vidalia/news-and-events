var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var Page = require("-components/page");
var {Grid,Row,Col} = require("-components/grid");
var $ = require("jquery");
var newsData;

var EventsPage = React.createClass({

  componentDidMount: function() {
    this.getEvents();
  },

  getEvents: function() {
    var RSS = "http://www.essex.ac.uk/news/eventfeed.xml";
    $.get(RSS, function (data) {
      console.log("function");
      console.log(data);
      newsData = data.getElementsByTagName("item");
    });
  },

  render:function() {
    var loading = !newsData;

    if (!loading) {
      var events, event;
      events = [];
      console.log("no more loading");
      console.log(newsData);
      console.log(newsData[0]);
      console.log(newsData[0].getElementsByTagName("title")[0].innerHTML);

      for (var i = 0; i < newsData.length; i++) {
        event = {title: newsData[i].getElementsByTagName("title")[0].innerHTML,
         description: newsData[i].getElementsByTagName("description")[0].innerHTML,
          link: newsData[i].getElementsByTagName("link")[0].innerHTML,
          date: newsData[i].getElementsByTagName("pubDate")[0].innerHTML};
        events.push(event);
      }

      return (
        <Page>
          <VBox>
            <BasicSegment>
              <Listview formatted items={events} itemFactory={(event)=>{
                //console.log(news);
                return (
                  <Item href={event.link}>
                      <Grid>
                        <Row>
                          <Col className="one wide column">
                            <i className="newspaper icon"/>
                          </Col>
                          <Col className="ten wide column">
                            {event.title}
                          </Col>
                          <Col className="five wide column">
                            {event.date.substring(0,16)}
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
          </BasicSegment>
        </VBox>
      </Container>
    );

  }

});

module.exports = EventsPage;
