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

  //Setting the initial state of essential variables and running crucial functions needed for functionality.
  getInitialState: function() {
    childEvent = false;
    child = <EventDetails onClick={this.resetHandler}/>;

    campus = new CampusLocator;

    //Retrieve the name of the campus that the user in currently at.
    campus.getCampus()
    .then(function(result) {
      // Success
      location = result.name;
    }, function(error) {
      // failed
      console.error(error);
    });

    this.getEvents();
    return {};
  },

  //Once the screeen has been successfully rendered gather the height and determine padding needed.
  componentDidMount: function() {
    paddingNeeded = document.getElementById('header').clientHeight + document.getElementById('menu').clientHeight;
    paddingNeeded = { paddingBottom: + paddingNeeded + "px"};
  },

  //Parse the event feed into the onRSSGet function in order to gather the event data.
  getEvents: function() {
    var RSS = "https://www.essex.ac.uk/news/eventPocketEssexFeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  //Gather all elements named 'Event' and update the screen to use the data.
  onRSSGet: function (data) {
    eventData = data.getElementsByTagName("Event");
    this.forceUpdate();
  },

  //This function is called by the eventDetails screen to reset the events page from displaying a specific event to displaying all events.
  resetHandler: function() {
    childEvent = false;
    this.forceUpdate();
  },

  //Displaying the specific event chosen by the user.
  chosenEvent: function(id) {
    child = <EventDetails value={id} onClick={this.resetHandler}/>;
    childEvent = true;
    this.forceUpdate();
  },

  render:function() {
    var loading = !eventData;

    //If the event data was successfully retrieved and the screen is no longer loading.
    if (!loading) {
      var events, event;
      events = [];

      //Populate the events array with events corresponding to the campus that the user is from/on.
      for (var i = 0; i < eventData.length; i++) {
        if (eventData[i].getElementsByTagName("EventCampus")[0].innerHTML === location) {
          event = {title: eventData[i].getElementsByTagName("EventTitle")[0].innerHTML,
            id: eventData[i].getElementsByTagName("EventID")[0].innerHTML,
            link: eventData[i].getElementsByTagName("EventURL")[0].innerHTML,
            date: eventData[i].getElementsByTagName("EventStartDateTime")[0].innerHTML};
            events.push(event);
        }
        //TODO: Need to somehow seperate html and text from content clean where they are mixed...
        //console.log(eventData[i].getElementsByTagName("EventContentClean")[0]);
        //console.log(eventData[i].getElementsByTagName("EventContentClean")[0].innerHTML.split(""));
        //if (eventData[i].getElementsByTagName("EventContentClean")[0]) {
        //
        //}
      }

      //If the user has selected an event, then render the page to display that event rather than the list of all events.
      if (childEvent) {
        return (
          <Page>
            <BasicSegment className="maxHeight">
              {child}
            </BasicSegment>
          </Page>
        );
      //If an event has not yet been chosen, then display the list of all events.
      } else {
        console.log(events);
        return (
          <Page style={paddingNeeded}>
            <BasicSegment>
              <Segment style={{padding:"0"}}>
                <AttachedLabel id="eventLabel" top>Upcoming Events</AttachedLabel>
                <Listview style={{margin:"0 !important"}} formatted items={events} itemFactory={(event)=>{
                  var id = event.id;
                  if (event.title !== "TBC" && event.title !== "TBA") {
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
    //If cant connect or gather data then render the page as follows and display the warning message notifying the user.
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
