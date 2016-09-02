var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var Page = require("-components/page");
var {Grid,Row,Col} = require("-components/grid");
var {AttachedLabel} = require("-components/label");
var $ = require("jquery");
var newsData, child, childEvent;

var EventDetails = require("./eventDetails");

var EventsPage = React.createClass({

  getInitialState: function() {
    childEvent = false;
    child = <EventDetails/>;
    return {};
  },

  componentDidMount: function() {
    this.getEvents();
  },

  getEvents: function() {
    var RSS = "http://www.essex.ac.uk/news/eventfeed.xml";
    $.get(RSS, function (data) {
      newsData = data.getElementsByTagName("item");
    });
  },

  pastOrFuture: function(eventDate) {
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    var eventDay = Number(eventDate.substring(5,7));
    var eventMonth = months.indexOf(eventDate.substring(8,11));
    var eventYear = Number(eventDate.substring(12,16));

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    if (eventYear >= year) {
      if (eventMonth >= month) {
        if (eventDay >= day) {
          return true;
        }
      }
    }
    return false;
  },

  chosenEvent: function(id) {
    console.log(id);
    child = <EventDetails value={id} />;
    childEvent = true;
    this.forceUpdate();
  },

  render:function() {
    var loading = !newsData;

    if (!loading) {
      var events, event, pastEvents;
      events = [];
      pastEvents = [];

      for (var i = 0; i < newsData.length; i++) {
        event = {title: newsData[i].getElementsByTagName("title")[0].innerHTML,
         description: newsData[i].getElementsByTagName("description")[0].innerHTML,
          link: newsData[i].getElementsByTagName("link")[0].innerHTML,
          date: newsData[i].getElementsByTagName("pubDate")[0].innerHTML};
        if (this.pastOrFuture(newsData[i].getElementsByTagName("pubDate")[0].innerHTML)) {
          events.push(event);
        } else {
          pastEvents.push(event);
        }
      }
      if (childEvent) {
        return (
          <Page>
            <BasicSegment style={{height:"100%"}}>
              {child}
            </BasicSegment>
          </Page>
        );
      } else {
        return (
          <Page>
            <BasicSegment>
              <Segment>
                <AttachedLabel top left>Upcoming Events</AttachedLabel>
                <Listview formatted items={events} itemFactory={(event)=>{
                  var id = event.link.substring(event.link.length - 5, event.link.length);
                  return (
                    <Item onClick={this.chosenEvent.bind(this,id)}>
                        <Grid>
                          <Row>
                            <Col className="one wide column">
                              <i className="announcement icon"/>
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
                }}/>
              </Segment>
              <Segment>
                <AttachedLabel top left>Past Events - these events have already happened</AttachedLabel>
                <Listview formatted items={pastEvents} itemFactory={(event)=>{
                  //console.log(news);
                  return (
                    <Item href={event.link}>
                        <Grid>
                          <Row>
                            <Col className="one wide column">
                              <i className="announcement icon"/>
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
                }}/>
              </Segment>
            </BasicSegment>
          </Page>
        );
      }
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
