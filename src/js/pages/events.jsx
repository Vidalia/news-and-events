var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var Page = require("-components/page");
var {Grid,Row,Col} = require("-components/grid");
var {AttachedLabel} = require("-components/label");
var $ = require("jquery");
var eventData, child, childEvent;

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
    $.get(RSS, this.onRSSGet);
  },

  onRSSGet: function (data) {
    eventData = data.getElementsByTagName("item");
    this.forceUpdate();
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
    var loading = !eventData;

    if (!loading) {
      var events, event, pastEvents;
      events = [];
      pastEvents = [];

      for (var i = 0; i < eventData.length; i++) {
        event = {title: eventData[i].getElementsByTagName("title")[0].innerHTML,
         description: eventData[i].getElementsByTagName("description")[0].innerHTML,
          link: eventData[i].getElementsByTagName("link")[0].innerHTML,
          date: eventData[i].getElementsByTagName("pubDate")[0].innerHTML};
        /*if (this.pastOrFuture(eventData[i].getElementsByTagName("pubDate")[0].innerHTML)) {
          events.push(event);
        } else {
          pastEvents.push(event);
        }*/
        events.push(event);
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
          <Page style={{height:"calc(100% - 140px)"}}>
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
            </BasicSegment>
          </Page>
        );
      }
    } else {
      return (
        <Container>
          <VBox>
            <BasicSegment>
              <Segment>
                <AttachedLabel top left>Upcoming Events</AttachedLabel>
                <Segment>
                  <h4>Sorry there doesn't appear to be any events at this time. Please check back at a later date.</h4>
                </Segment>
              </Segment>
            </BasicSegment>
          </VBox>
        </Container>
      );
    }
  }
});

module.exports = EventsPage;

/*
<Segment>
  <AttachedLabel top left>Past Events - these events have already happened</AttachedLabel>
  <Listview formatted items={pastEvents} itemFactory={(event)=>{
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
*/
