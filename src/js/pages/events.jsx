var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var Page = require("-components/page");
var {Grid,Row,Col} = require("-components/grid");
var {AttachedLabel} = require("-components/label");
var CampusLocator = require("uoe-campus-awareness/campus-locator");
var $ = require("jquery");
var eventData, child, childEvent, paddingNeeded, campus, location;

var EventDetails = require("./eventDetails");

var EventsPage = React.createClass({

  getInitialState: function() {
    childEvent = false;
    child = <EventDetails onClick={this.resetHandler}/>;
    //Need to have this changed by the campus aware
    campus = new CampusLocator;

    campus.getCampus()
    .then(function(result) {
    console.log(result); // Success
    location = result.name;
    }, function(error) {
    console.error(error); // failed
    })

    this.getEvents();
    return {};
  },

  componentDidMount: function() {
    paddingNeeded = document.getElementById('header').clientHeight + document.getElementById('menu').clientHeight /*+ 14*/;
    paddingNeeded = { paddingBottom: + paddingNeeded + "px"};
  },

  getEvents: function() {
    var RSS = "http://www.essex.ac.uk/news/eventfeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  onRSSGet: function (data) {
    console.log(location);
    if (location == "Colchester") {
      //Only get the colchester stuff
      eventData = data.getElementsByTagName("item");
    } else if (location == "Southend") {
      //Only get the southend stuff
    } else {
      console.log("Error unable to resolve: " + campus + " as geo location...");
    }
    this.forceUpdate();
  },

  resetHandler: function() {
    childEvent = false;
    this.forceUpdate();
  },

  //this function was used to check whether an event was in the past or the future.
  /*pastOrFuture: function(eventDate) {
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
  },*/

  chosenEvent: function(id) {
    console.log(id);
    child = <EventDetails value={id} onClick={this.resetHandler}/>;
    childEvent = true;
    this.forceUpdate();
  },

  render:function() {
    var loading = !eventData;
    //console.log(eventData);

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
            <BasicSegment className="maxHeight">
              {child}
            </BasicSegment>
          </Page>
        );
      } else {
        return (
          <Page style={paddingNeeded}>
            <BasicSegment>
              <Segment style={{padding:"0"}}>
                <AttachedLabel id="eventLabel" top>Upcoming Events</AttachedLabel>
                <Listview style={{margin:"0 !important"}} formatted items={events} itemFactory={(event)=>{
                  var id = event.link.substring(event.link.length - 5, event.link.length);
                  //console.log(event);
                  // if (event.description == "") {
                  //   console.log("--------------------------");
                  //   console.log(event);
                  //   console.log(event.description);
                  //   console.log("--------------------------");
                  // } else {
                  //   console.log("++++++++++++++++++++++++++");
                  //   console.log(event);
                  //   console.log(event.description);
                  //   console.log("++++++++++++++++++++++++++");
                  // }
                  if (event.title != "TBC" && event.title != "TBA") {
                    return (
                      <Item onClick={this.chosenEvent.bind(this,id)}>
                          <Grid>
                            <Row>
                              <Col className="one wide column">
                                <i className="announcement icon"/>
                              </Col>
                              <Col id="eventTitle" className="ten wide column">
                                {event.title}
                              </Col>
                              <Col id="eventDate" className="five wide column">
                                {event.date.substring(0,16)}
                              </Col>
                            </Row>
                          </Grid>
                      </Item>
                    );
                  }
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
                <AttachedLabel top>Upcoming Events</AttachedLabel>
                <Segment>
                  <h4 id="warning">Sorry there doesn't appear to be any events at this time. Please check back at a later date.</h4>
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


//The below code was used when the rss feed would return both old and new events, since then the RSS feed has been updated to only new events.
//This code may no longer be needed, and if so can be deleted.
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
